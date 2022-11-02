// 验证查询术语出现在每个字段中
const body = pm.response.json();

pm.test('combinded fields query successful', () => {
    let title = body.hits.hits[0]._source.title.toLowerCase();
    let overview = body.hits.hits[0]._source.overview.toLowerCase();
    let tagline = body.hits.hits[0]._source.tagline.toLowerCase();
    let tokens = 'first night scandalous four room'.split(' ');

    // 验证命中文档的每个字段至少包含查询文本中的一个术语
    pm.expect(tokens.some(t => title.indexOf(t) > 0)).to.be.true;
    pm.expect(tokens.some(t => overview.indexOf(t) > 0)).to.be.true;
    pm.expect(tokens.some(t => tagline.indexOf(t) > 0)).to.be.true;
});
