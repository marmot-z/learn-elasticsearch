const body = pm.response.json();

pm.test('boolean query successful', () => {
    // 由于设置了 minimum_should_match 参数，
    // 必须满足一个 should 查询条件，所以返回了 4 条记录
    pm.expect(body.hits.total.value).eq(4);
    // 必须包含 Paramount Picture 演员
    pm.expect(
        body.hits.hits.flatMap(i => 
            i._source.production_companies.map(j => j.name)
        )
    )
    .to.be.all.contains('Paramount Pictures');
    // 名称必须含有 Four、baby 短语
    pm.expect(
        body.hits.hits.map(i => i._source.title)
    )
    .to.be.all.match(/four|baby/i);
    // 发布状态必须为 release
    pm.expect(
        body.hits.hits.map(i => i._source.status)
    )
    .to.be.all.match(/released/i);
    // 得分必须大于 6.0
    pm.expect(
        body.hits.hits.map(i => i._source.vote_average).first()
    )
    .to.be.above(6.0);
});
