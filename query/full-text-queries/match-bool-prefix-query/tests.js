const body = pm.response.json();

pm.test('match bool prefix query successful', () => {
    let titles = body.hits.hits.map(i => i._source.title);

    // four 使用 term 查询，可以出现在字段内容的任意位置
    pm.expect(
        titles.some(t => t.match(/^four.*/i))
    )
    .to.be.true;
    pm.expect(
        titles.some(t => t.match(/.*four$/i))
    )
    .to.be.true;

    // prirates 使用 prefix 查询，只能出现字段内容的开头
    pm.expect(
        titles.some(t => t.match(/^Pirates.*/i))
    )
    .to.be.true;
    pm.expect(
        titles.some(t => t.match(/.+Pirates.*/i))
    )
    .to.be.false;
});
