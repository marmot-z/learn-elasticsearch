let asyncSeries = eval(pm.globals.get("asyncSeries"));
let createIndex = eval(pm.globals.get("createIndex"));
let options = {
    "indexName": "my-index-000001",
    "settings": {
        "index": {
            "number_of_shards": 1,
            "number_of_replicas": 2
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
})
