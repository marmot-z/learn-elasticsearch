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

    pm.test('update settings successful', () => {
        // 验证索引 setting 更新成功
        pm.expect(body.acknowledged).eq(true);
        pm.expect(indexInfo[indexName].settings.index['number_of_replicas']).eq('2');
    });
});
