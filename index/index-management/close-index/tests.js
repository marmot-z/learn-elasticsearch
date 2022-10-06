let asyncSeries = eval(pm.globals.get("asyncSeries"));
let getIndexStatus = eval(pm.globals.get("getIndexStatus"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
const body = pm.response.json();

asyncSeries([
    cb => getIndexStatus(indexName, cb),
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    let indexStatus = resp[0];

    pm.test('close index successful', () => {
        pm.expect(body.indices[indexName].closed).is.to.true;

        // 验证索引状态为 close
        pm.expect(indexStatus).is.contain('close');
    });
});
