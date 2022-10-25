const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    pm.test('get alias successful', () => {
        pm.expect(body[indexName].aliases['my-alias']).to.be.exist;
    });
});
