const body = pm.response.json();

pm.test('ids query successful', () => {
    let docIds = body.hits.hits.map(hit => hit._source.id);

    pm.expect(docIds.indexOf(5) > -1).to.be.true;
    pm.expect(docIds.indexOf(8) == -1).to.be.true;
    pm.expect(docIds.indexOf(11) > -1).to.be.true;
});

pm.collectionVariables.set('collection.finish', true);
