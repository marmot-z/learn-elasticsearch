const elasticsearchHost = 'http://localhost:9200';
const elasticsearchVersion = '7.17.0';

// set global varibales
pm.collectionVariables.set('esHost', elasticsearchHost);
pm.collectionVariables.set('esVersion', elasticsearchVersion);

// set default header
pm.request.headers.add({key: 'Content-type', value: 'application/json'});

// set global function
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

postman.setGlobalVariable('createIndex', (options, callback) => {
    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${options.indexName}`,
        method: 'PUT',
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                settings: options.settings || {},
                mappings: options.mappings || {}
            })
        }
    }, (err, resp) => {
        if (err) return callback(err);

        let body = resp.json();

        callback(null, body.acknowledged);
    });
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
