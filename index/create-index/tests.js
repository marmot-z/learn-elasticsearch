let asyncSeries = eval(pm.globals.get("asyncSeries"));
let getIndex = eval(pm.globals.get("getIndex"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));
let body = pm.response.json();
const indexName = 'my-index-000001';

asyncSeries([
    cb => getIndex(indexName, cb),
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    let indexInfo = resp[0];

    pm.test('create index successful', () => {
        // 验证索引创建成功
        pm.expect(body.acknowledged).to.be.true;

        // 验证索引 mappings 是否正确
        pm.expect(indexInfo[indexName].mappings.properties.id.type).eq('integer');

        // 验证索引 settings 是否正确
        pm.expect(indexInfo[indexName].settings.index.number_of_shards).eq('1');
        pm.expect(indexInfo[indexName].settings.index.number_of_replicas).eq('2');

        // 验证索引 alias 是否正确
        pm.expect(indexInfo[indexName].aliases['index01-middle']).to.be.exist;
        pm.expect(indexInfo[indexName].aliases['index01-middle'].filter.term.tags).eq('middle');
    });
});
