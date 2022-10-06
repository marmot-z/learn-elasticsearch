let asyncSeries = eval(pm.globals.get("asyncSeries"));
let createIndex = eval(pm.globals.get("createIndex"));
let options = {
    "indexName": "my-index-000001"
};

asyncSeries([
    cb => createIndex(options, cb)
], (err, resp) => {
    if (err) throw err;

    resp[0] && console.log('索引已创建');
})
