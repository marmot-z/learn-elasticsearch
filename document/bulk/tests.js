let asyncSeries = eval(pm.globals.get("asyncSeries"));
let getDocumentById = eval(pm.globals.get("getDocumentById"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));
let body = pm.response.json();

asyncSeries([
    (cb) => getDocumentById({indexName: 'test', id: 1}, cb),
    (cb) => getDocumentById({indexName: 'test', id: 3}, cb),
    (cb) => deleteIndex('test', cb)
], (err, results) => {
    if (err) throw err;

    let doc1 = results[0];
    let doc2 = results[1];

    pm.test('bulk successful', function() {
        // 创建文档 1 成功并更新
        pm.expect(doc1.found).eq(true);
        pm.expect(doc1._version).eq(2);
        pm.expect(doc1._source.field1).eq('value1');
        pm.expect(doc1._source.field2).eq('value2');
        // 创建文档 3 成功
        pm.expect(doc2.found).eq(true);

        // 创建文档 1 成功
        pm.expect(body.items[0].index.result).eq('created');
        // 删除文档 2 失败（文档 2 不存在），该操作失败不影响其他操作
        pm.expect(body.items[1].delete.result).eq('not_found');
        // 创建文档 3 成功
        pm.expect(body.items[2].create.result).eq('created');
        // 更新文档 1 成功
        pm.expect(body.items[3].update.result).eq('updated');
    });
});
