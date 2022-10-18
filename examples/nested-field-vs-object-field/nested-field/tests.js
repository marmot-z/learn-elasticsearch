const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const body = pm.response.json();

asyncSeries([
    cb => deleteIndex('books_test', cb)
], (err, resp) => {
    if (err) throw err;

    pm.test('nested field search success', () => {
        // nested 类型查询结果符合预期，返回零条
        pm.expect(body.hits.hits.length).eq(0);
    });
});
