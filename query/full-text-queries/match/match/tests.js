const body = pm.response.json();

pm.test('match query successful', () => {
    pm.expect(body.hits.hits.length).eq(1);

    let title = body.hits.hits[0]._source.title.toLowerCase();

    // 使用了 minimum_should_match 参数，
    // 则返回的文档必须命中至少 3 个查询子句
    pm.expect(title).to.be.contain('i');
    pm.expect(title).to.be.contain('want');
    pm.expect(title).to.be.contain('you');
});
