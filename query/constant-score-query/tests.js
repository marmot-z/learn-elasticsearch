const body = pm.response.json();

pm.test('constant score query successful', () => {
    // 返回的文档分数都同 boost 一致
    body.hits.hits.map(doc => doc._score)
        .forEach(s => pm.expect(s).eq(1.2));
});
