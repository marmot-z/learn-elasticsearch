const asyncSeries = eval(pm.globals.get("asyncSeries"));
const getIndex = eval(pm.globals.get("getIndex"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => getIndex(indexName, cb),
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    let indexInfo = resp[0];

    pm.test('add multi fields to existing field successful', () => {
        pm.expect(body.acknowledged).to.be.true;

        let cityProps = indexInfo[indexName].mappings.properties.city;
        
        pm.expect(cityProps.type).eq('text');
        pm.expect(cityProps.fields.raw.type).eq('keyword');
    });
});
