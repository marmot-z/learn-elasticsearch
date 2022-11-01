const body = pm.response.json();

pm.test('zero terms query succesful', () => {
    // 当查询文本分词后得不到 token 时
    // zero_term_query 设置为 all，查询效果与 match_all 一致
    // 可以查看返回结果中的 profile 内容
    pm.expect(body.hits.total.value).eq(3051);
});
