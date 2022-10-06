let asyncSeries = eval(pm.globals.get("asyncSeries"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
let body = pm.response.json();

asyncSeries([
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    pm.test('get index successful', () => {
        pm.expect(body[indexName]).to.be.exist;
    });
});
