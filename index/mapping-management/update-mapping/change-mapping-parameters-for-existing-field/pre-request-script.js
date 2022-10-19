const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const options = {
    "indexName": "my-index-000001",
    "mappings": {
        "properties": {
            "user_id": {
                "type": "keyword",
                // keyword 类型字段存储长度为 20
                "ignore_above": 20
            }
        }
    }
};

asyncSeries([
    cb => createIndex(options, cb)
], (err, resp) => {
    if (err) throw err;
});
