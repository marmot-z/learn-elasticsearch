const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    pm.test('get index mapping successful', () => {
        // 验证索引 mapping 对应的值符合预期
        pm.expect(body[indexName]).to.be.exist;
        pm.expect(body[indexName].mappings.properties.id.type).eq('integer');
        pm.expect(body[indexName].mappings.properties.name.type).eq('text');
    });
});
