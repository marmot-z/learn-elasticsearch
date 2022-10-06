const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));

asyncSeries([
    cb => createIndex({indexName: 'my-index-000001'}, cb),
    cb => createIndex({indexName: 'my-index-000002'}, cb),
], (err, resp) => {
    if (err) throw err;
});
