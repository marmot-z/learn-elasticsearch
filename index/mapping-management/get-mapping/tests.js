const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    pm.test('get mapping successful', () => {
        pm.expect(body[indexName].mappings.properties.name).to.be.exist;
        pm.expect(body[indexName].mappings.properties.name.type).eq('text');
    });
});
