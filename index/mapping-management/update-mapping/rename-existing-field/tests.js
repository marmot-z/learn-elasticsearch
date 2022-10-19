const asyncSeries = eval(pm.globals.get("asyncSeries"));
const searchDocument = eval(pm.globals.get("searchDocument"));
const deleteIndex = eval(pm.globals.get("deleteIndex"));
const indexName = 'my-index-000001';
const searchDsl = {
    'query': {
        'term': {
            'user_id': 1
        }
    }
};
const body = pm.response.json();

asyncSeries([
    cb => searchDocument(indexName, searchDsl, cb),
    cb => deleteIndex(indexName, cb)
], (err, resp) => {
    if (err) throw err;

    let docSearchResponse = resp[0];
    console.log(docSearchResponse);

    pm.test('rename field successful', () => {
        pm.expect(body.acknowledged).to.be.true;

        pm.expect(docSearchResponse.hits.hits.length).eq(1);
    });
});
