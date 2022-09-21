let asyncSeries = eval(pm.globals.get("asyncSeries"));
let deleteIndex = eval(pm.globals.get("deleteIndex"));
let body = pm.response.json();
let indexs = ['test1', 'test2', 'test3', 'test4'];

asyncSeries(
    indexs.map(index => cb => deleteIndex(index, cb)),
    (err, results) => {
        if (err) throw err;

        pm.test('multi get successful', function() {
            // 验证获取默认索引文档
            pm.expect(body.docs[0].found).eq(true);
            pm.expect(body.docs[0]._source.id).eq(1);
            // 验证获取指定索引文档
            pm.expect(body.docs[1].found).eq(true);
            pm.expect(body.docs[1]._source.id).eq(1);
            // 验证获取指定字段
            pm.expect(body.docs[2].found).eq(true);
            pm.expect(body.docs[2]._source.id).eq(2);
            pm.expect(body.docs[2]._source.age).is.undefined;
            // 验证获取文档失败（文档不存在）
            pm.expect(body.docs[3].found).eq(false);
        });
    }
);
