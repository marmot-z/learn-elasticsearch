const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const body = pm.response.json();

asyncSeries([
    cb => deleteIndex('books_test', cb)
], (err, resp) => {
    if (err) throw err;

    // 此测试用例会验证报错
    pm.test('object field search fail', () => {
        // 期待查询结果为零条，实际大于零条
        pm.expect(body.hits.hits.length).eq(0);
    });
});
