let body = pm.response.json();

pm.test('exists query successful', () => {
    // 部分文档 cast 字段没有内容 
    pm.expect(body.hits.total.value).below(3051);
});
