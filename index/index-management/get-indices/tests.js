const asyncSeries = eval(pm.globals.get("asyncSeries"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const body = pm.response.text();
const indexName1 = 'my-index-000001';
const indexName2 = 'my-index-000002';

asyncSeries([
    cb => deleteIndex(indexName1, cb),
    cb => deleteIndex(indexName2, cb)
], (err, resp) => {
    if (err) throw err;

    let cols = body.split('\n')
            // skip head
            .slice(1)
            .flatMap(row => row.split(/\s+/));

    console.log(cols);

    pm.test('get indices successful', () => {
        pm.expect(cols).is.to.contains(indexName1);
        pm.expect(cols).is.to.contains(indexName2);
    });
});
