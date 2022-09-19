let asyncSeries = eval(pm.globals.get("asyncSeries"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));
let body = pm.response.json();

asyncSeries([
    (cb) => deleteIndex('users', cb)
], (err, results) => {
    if (err) throw err;

    pm.test('get document(1) successful', function() {
        pm.expect(body.found).eq(true);
        pm.expect(body._source.user).eq('Mike');
    });
});
