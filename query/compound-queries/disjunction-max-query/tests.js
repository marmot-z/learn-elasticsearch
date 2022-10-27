const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const body = pm.response.json();

asyncSeries([
    cb => deleteIndex('my-index-000001', cb)
], (err, resp) => {
    if (err) throw err;

    pm.test('disjunction max query successful', () => {
        let hits = body.hits.hits;

        // 文档 1 中 title、body 字段各有 brown，按道理总分数更高
        // 但是由于 dis_max 查询只取最高匹配的分数 + 其他匹配分数 * tie_breaker
        // 所以由于文档 2 的 brown fox 单个匹配分数更高，所以文档总分数更高
        // 故文档 2 的总分数比文档 1 高
        pm.expect(hits[0]._source.id).eq(2);
        pm.expect(hits[1]._source.id).eq(1);
    });
});
