const asyncSeries = eval(pm.globals.get("asyncSeries"));
const getIndex = eval(pm.globals.get("getIndex"));
const indexName = 'my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => getIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    let indexInfo = resp[0];

    pm.test('delete index successful', () => {
        pm.expect(body.acknowledged).to.be.true;
        
        // 验证索引已被删除
        pm.expect(indexInfo.status).eq(404);
        pm.expect(indexInfo.error.type).eq('index_not_found_exception');
    });
});
