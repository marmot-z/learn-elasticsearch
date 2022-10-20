const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const options = {
    "indexName": "my-index-000001",
    "mappings": {
        "properties": {
            "name": {
                "type": "text"
            }
        }
    }
};

asyncSeries([
    cb => createIndex(options, cb)
], (err, resp) => {
    if (err) throw err;
});
