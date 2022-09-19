let asyncSeries = eval(pm.globals.get("asyncSeries"));
let getDocumentById = eval(pm.globals.get("getDocumentById"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));

asyncSeries([
    (cb) => getDocumentById({indexName: 'users',id: 1}, cb),
    (cb) => deleteIndex('users', cb)
], (err, results) => {
    if (err) throw err;

    let doc = results[0];

    pm.test('update document successful', function() {
        pm.expect(doc._version).eq(2);
        pm.expect(doc._source.user).eq('Lucy');
        // 保留文档原先字段内容
        pm.expect(doc._source.message).eq('trying out kibana');
    });
});
