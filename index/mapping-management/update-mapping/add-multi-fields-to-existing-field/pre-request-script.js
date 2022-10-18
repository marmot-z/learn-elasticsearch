const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const options = {
    "indexName": "my-index-000001",
    "mappings": {
        "properties": {
            "city": {
                "type": "text"
            }
        }
    }
};

asyncSeries([
    // 创建 name 多字段类型的索引
    cb => createIndex(options, cb)
], (err, resp) => {
    if (err) throw err;
});
