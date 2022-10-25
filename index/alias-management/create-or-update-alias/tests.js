const asyncSeries = eval(pm.globals.get("asyncSeries"));
const searchDocument = eval(pm.globals.get("searchDocument"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const body = pm.response.json();

asyncSeries([
    // 通过别名获取数据
    cb => searchDocument('my-alias', {query: {match_all: {}}}, cb),
    cb => deleteIndex('my-index-000001', cb)
], (err, resp) => {
    if (err) throw err;

    let searchResp = resp[0];

    pm.test('create/update alias successful', () => {
        // 测试别名创建是否成功
        pm.expect(body.acknowledged).eq(true);
        // 测试是否可以通过索引查询数据
        pm.expect(searchResp.hits.hits.length).to.gt(0);
    });
});
