const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const body = pm.response.json();

asyncSeries([
    cb => deleteIndex("my-index-000001", cb)
], (err, resp) => {
    if (err) throw err;

    pm.test('match synonyms successful', () => {
        let message = body.hits.hits[0]._source.message;

        // 由于 message 字段指定了 synonym 分词器
        // 所以查询时 USA 会被转换为同义词 “united states of America people” 进行查询（见 profile）
        // 所以可以查到对应的内容
        pm.expect(body.hits.hits.length).eq(1);
        pm.expect(message).eq('united states of America people');
    });
});
