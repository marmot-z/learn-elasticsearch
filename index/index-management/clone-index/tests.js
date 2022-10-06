const asyncSeries = eval(pm.globals.get("asyncSeries"));
const getIndex = eval(pm.globals.get("getIndex"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const cloneIndexName = 'cloned-my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => getIndex(cloneIndexName, cb),
    cb => deleteIndex('my-index-000001', cb),
    cb => deleteIndex(cloneIndexName, cb)
], (err, resp) => {
    if (err) throw err;

    let cloneIndexInfo = resp[0];

    pm.test('clone index successful', () => {
        pm.expect(body.acknowledged).to.be.true;
        // 验证索引拷贝成功
        pm.expect(cloneIndexInfo[cloneIndexName]).to.be.exist;
        // 验证目标索引 aliases 创建成功
        pm.expect(cloneIndexInfo[cloneIndexName].aliases['clone-index01-high']).to.be.exist;
    });
});
