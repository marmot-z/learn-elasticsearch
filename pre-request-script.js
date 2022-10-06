const elasticsearchHost = 'http://localhost:9200';
const elasticsearchVersion = '7.17.0';

// set global varibales
pm.collectionVariables.set('esHost', elasticsearchHost);
pm.collectionVariables.set('esVersion', elasticsearchVersion);

// set default header
pm.request.headers.add({key: 'Content-type', value: 'application/json'});

// global functions
// see also: https://www.postman.com/postman/workspace/postman-answers/request/3407886-06011115-e3cf-4711-926c-55a417d530f1
let asyncSeries = (tasks, cb = () => {}) => {
    let _series = function(tasks, cb, currOperation = 0, results = []) {
        // Bail-out condition
        if (currOperation === tasks.length) {
            return cb(null, results);
        }

        if (typeof tasks[currOperation] !== 'function') {
            return cb(new Error('asyncSeries: Please provide a function'));
        }

        tasks[currOperation]((err, res) => {
            if (err) {
                return cb(err);
            }

            results.push(res);
            
            return _series(tasks, cb, currOperation + 1, results);
        });
    }

    return _series(tasks, cb);
};

let deleteIndex = (indexName, callback) => {
   pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${indexName}`,
        method: 'DELETE'
    }, (err, resp) => {
        if (err) return callback(err);

        let body = resp.json();

        callback(
            body.acknowledged ? 
                null : 
                new Error(`${indexName} 索引删除失败`),
            body.acknowledged
        );
    });
};

let createIndex = (options, callback) => {
    let indexName = options.indexName;
    delete options.indexName;

    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${indexName}`,
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(options)
        }
    }, (err, resp) => {
        if (err) return callback(err);

        let body = resp.json();

        callback(
            body.acknowledged ? 
                null : 
                new Error(`${indexName} 索引创建失败`),
            body.acknowledged
        );
    });
};

let getIndex = (indexName, callback) => {
    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${indexName}`,
        method: 'GET'
    }, (err, resp) => {
        if (err) return callback(err);

        callback(null, resp.json());
    });
};

let createDocument = (options, callback) => {
    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${options.indexName}/_doc/${options.id ? options.id : ''}`,
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            mode: 'raw',
            raw: JSON.stringify(options.doc)
        }
    }, (err, resp) => {
        if (err) return callback(err);

        let body = resp.json();

        callback(null, body.result === 'created');
    });
};

let getDocumentById = (options, callback) => {
    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${options.indexName}/_doc/${options.id}`,
        method: 'GET',
    }, (err, resp) => {
        if (err) return callback(err);

        callback(null, resp.json());
    });
};

let loadDatas = (datas, callback, sleepmillis) => {
    let tasks = Object.entries(datas)
        .flatMap(([k, v]) => 
            v.map(data => 
                _cb => createDocument({indexName: k, doc: data}, _cb)
            )
        );

    // 部分数据创建后需等待若干毫秒后才可以被查询到
    if (sleepmillis && sleepmillis > 0) {
        tasks.push(_cb => setTimeout(_cb, sleepmillis));
    }

    asyncSeries(tasks, callback);
};

// set global function
postman.setGlobalVariable('asyncSeries', asyncSeries);
postman.setGlobalVariable('createIndex', createIndex);
postman.setGlobalVariable('getIndex', getIndex);
postman.setGlobalVariable('deleteIndex', deleteIndex);
postman.setGlobalVariable('createDocument', createDocument);
postman.setGlobalVariable('getDocumentById', getDocumentById);
postman.setGlobalVariable('loadDatas', loadDatas);
