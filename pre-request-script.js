const elasticsearchHost = 'http://localhost:9200';
const elasticsearchVersion = '7.17.0';

pm.collectionVariables.set('esHost', elasticsearchHost);
pm.collectionVariables.set('esVersion', elasticsearchVersion);

/**
 * global function
 */
utils = {

    /**
     * 创建 es 索引
     * 
     * @param indexName 索引名称
     * @param mappings mappings
     * @param settings settings
     * @return {{Promise}} promise
     */
    createIndex: function(indexName, mappings, settings) {
        if (!indexName) {
            throw new Error('索引名称不能为空');
        }

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
            })
        });
    },

    
    deleteIndex: function(indexName) {},

    saveDocument: function (indexName, doc, id) {},

    updateDocument: function (indexName, doc, id) {},

    deleteDocument: function(indexName, id) {}
};