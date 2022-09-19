let asyncSeries = eval(pm.globals.get("asyncSeries"));
let createDocument = eval(pm.globals.get("createDocument"));

asyncSeries([
    (cb) => createDocument({
        indexName: 'users',
        doc: {
            "user": "Mike",
            "post_date": "2019-04-15T14:12:12",
            "message": "trying out kibana"
        },
        id: 1
    }, cb)
], (err, res) => {
    if (err) throw err;

    console.log(`创建文档 ${res ? '成功' : '失败'}`);
});
