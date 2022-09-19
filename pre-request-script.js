const elasticsearchHost = 'http://localhost:9200';
const elasticsearchVersion = '7.17.0';

pm.collectionVariables.set('esHost', elasticsearchHost);
pm.collectionVariables.set('esVersion', elasticsearchVersion);

// set default header
pm.request.headers.add({key: 'Content-type', value: 'application/json'});

/**
 * global function
 */
let utils = {
    /**
     * 创建 es 索引
     * 
     * @param indexName 索引名称
     * @param mappings mappings
     * @param settings settings
     * @return 索引是否创建成功
     */
    createIndex: function(indexName, mappings = {}, settings = {}) {
        return new Promise((resolve, reject) => {
            pm.sendRequest({
                url: `${elasticsearchHost}/${indexName}`,
                method: 'PUT',
                body: {
                    settings: settings,
                    mappings: mappings
                }
            }, (err, resp) => {
                if (err) return reject(err);

                let body = resp.json();

                resolve(body.acknowledged && body.index === indexName);
            });
        });
    },

    deleteIndex: function(indexName) {
        return new Promise((resolve, reject) => {
            pm.sendRequest({
                url: `${elasticsearchHost}/${indexName}`,
                method: 'DELETE',
            }, (err, resp) => {
                if (err) return reject(err);

                let body = resp.json();

                resolve(body.acknowledged);
            });
        });
    },

    saveDocument: function(indexName, doc, id) {},

    /**
     * 根据 id 获取文档
     * 
     * @param indexName 索引名称
     * @param id 文档 id
     * @returns 文档内容
     */
    getDocumentById: function(indexName, id) {
        return new Promise((resolve, reject) => {
            pm.sendRequest({
                url: `${elasticsearchHost}/${indexName}/${id}`,
                method: 'GET'
            }, (err, resp) => {
                if (err) return reject(err);

                resolve(resp.json());
            });
        });
    },

    searchDocument: function(searchDsl) {},

    updateDocument: function(indexName, doc, id) {},

    deleteDocument: function(indexName, id) {}
};

// see also: https://www.postman.com/postman/workspace/postman-answers/request/3407886-06011115-e3cf-4711-926c-55a417d530f1
postman.setGlobalVariable('asyncSeries', (tasks, cb = () => {}) => {
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

            // Recursively call the next task in series till we're done executing all the operations
            return _series(tasks, cb, currOperation + 1, results);
        });
    }

    return _series(tasks, cb);
});

postman.setGlobalVariable('deleteIndex', (indexName, callback) => {
   pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${indexName}`,
        method: 'DELETE'
    }, (err, resp) => {
        if (err) return callback(err);

        let body = resp.json();

        callback(null, body.acknowledged);
    });
});

postman.setGlobalVariable('createDocument', (options, callback) => {
    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${options.indexName}/_doc/${options.id}`,
        method: 'POST',
        header: {
            'Content-type': 'application/json'
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
});

postman.setGlobalVariable('getDocumentById', (options, callback) => {
    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${options.indexName}/_doc/${options.id}`,
        method: 'GET',
    }, (err, resp) => {
        if (err) return callback(err);

        callback(null, resp.json());
    });
});
