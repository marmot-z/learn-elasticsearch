const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const options = {
    "indexName": "my-index-000001",
    "settings": {
        "index": {
            "number_of_shards": 1,
            "number_of_replicas": 2,
            "blocks.write": true
        }
    },
    "mappings": {
        "properties": {
            "id": {
                "type": "integer"
            },
            "name": {
                "type": "text"
            },
            "tags": {
                "type": "keyword"
            }
        }
    },
    "aliases": {
        "index01-middle": {
            "filter": {
                "term": {
                    "tags": "middle"
                }
            }
        }
    }
};

asyncSeries([
    cb => createIndex(options, cb)
], (err, resp) => {
    if (err) throw err;

    resp[0] && console.log('索引已创建');
});
