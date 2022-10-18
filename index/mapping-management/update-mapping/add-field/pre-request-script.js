const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const options = {
    "indexName": "my-index-000001"
};

asyncSeries([
    // 创建一个没有 mappings、settings 的索引
    cb => createIndex(options, cb)
], (err, resp) => {
    if (err) throw err;
});
