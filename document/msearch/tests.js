let asyncSeries = eval(pm.globals.get("asyncSeries"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));
let body = pm.response.json();

asyncSeries([
    cb => deleteIndex('test1', cb),
    cb => deleteIndex('test2', cb)
], (err, res) => {
    if (err) throw err;

    pm.test('mulit search successful', () => {
        // 验证 test1 索引 term 精确查询成功
        pm.expect(body.responses[0].hits.hits[0]._source.id).eq(1);
        pm.expect(body.responses[0].hits.hits[0]._source.tag).eq('blogging');

        // 验证 test1 索引 match 匹配查询成功
        pm.expect(body.responses[1].hits.hits[0]._source.id).eq(2);
        pm.expect(body.responses[1].hits.hits[0]._source.message.startsWith('learning')).to.be.true;

        // 验证 test2 索引全部查询成功
        pm.expect(body.responses[2].hits.hits.length).eq(2);
    });
});
