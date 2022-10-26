const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const options = {
    "indexName": "my-index-000001",
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 1
    }
};

asyncSeries([
    cb => createIndex(options, cb)
], (err, resp) => {
    if (err) throw err;
});
