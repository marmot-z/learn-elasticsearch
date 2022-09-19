let asyncSeries = eval(pm.globals.get("asyncSeries"));
let getDocumentById = eval(pm.globals.get("getDocumentById"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));
let body = pm.response.json();

asyncSeries([
    (cb) => getDocumentById({indexName: 'users',id: 1}, cb),
    (cb) => deleteIndex('users', cb)
], (err, results) => {
    if (err) throw err;

    pm.test('create document successful', function() {
        pm.expect(results[0]._id).eq('1');
        pm.expect(results[0].found).eq(true);
    });
});
