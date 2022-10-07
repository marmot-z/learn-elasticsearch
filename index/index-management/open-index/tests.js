const asyncSeries = eval(pm.globals.get("asyncSeries"));
const getIndexStatus = eval(pm.globals.get("getIndexStatus"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => getIndexStatus(indexName, cb),
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    pm.test('open index successful', () => {
        pm.expect(body.acknowledged).is.to.true;

        // 验证索引状态为 open
        pm.expect(resp[0]).is.to.contain('open');
    });
});
