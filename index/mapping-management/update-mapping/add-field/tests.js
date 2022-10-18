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

    pm.test('add field successful', () => {
        // 验证字段添加成功
        pm.expect(body.acknowledged).to.be.true;
        pm.expect(indexInfo[indexName].mappings.properties.title.type).eq('text');
    });
})
