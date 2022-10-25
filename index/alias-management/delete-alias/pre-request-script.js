const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const options = {
    'indexName': 'my-index-000001',
    // 创建索引时创建别名
    'aliases': {
        'my-alias': {
            'is_write_index': true
        }
    }
};

asyncSeries([
    cb => createIndex(options, cb)
], (err, resp) => {
    if (err) throw err;
});
