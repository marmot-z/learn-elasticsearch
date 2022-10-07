const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const closeIndex = eval(pm.globals.get("closeIndex"));
const indexName = 'my-index-000001';

asyncSeries([
    // 创建索引
    cb => createIndex({indexName}, cb),
    // 关闭索引
    cb => closeIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;
});
