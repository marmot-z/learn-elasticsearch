// 验证 elasticsearch 是否启动成功
pm.test('elasticsearch start successful', function() {
    let body = pm.response.json();
    let version = pm.collectionVariables.get('esVersion');

    return pm.response.status == 200 &&
            body.version.name === version;
});
