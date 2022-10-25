const asyncSeries = eval(pm.globals.get("asyncSeries"));
const getAlias = eval(pm.globals.get("getAlias"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => getAlias(indexName, cb),
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    let aliasInfo = resp[0];

    pm.test('delete alias successful', () => {
        // 判断别名删除成功
        pm.expect(body.acknowledged).eq(true);
        pm.expect(aliasInfo[indexName].aliases['my-alias']).to.be.not.exist;
    });
});
