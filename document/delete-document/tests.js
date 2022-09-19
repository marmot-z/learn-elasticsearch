let asyncSeries = eval(pm.globals.get("asyncSeries"));
let getDocumentById = eval(pm.globals.get("getDocumentById"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));

asyncSeries([
    (cb) => getDocumentById({indexName: 'users',id: 1}, cb),
    (cb) => deleteIndex('users', cb)
], (err, results) => {
    if (err) throw err;

    let doc = results[0];

    pm.test('delete document successful', function() {
        // document 1 not found
        pm.expect(doc.found).eq(false);
    });
});
