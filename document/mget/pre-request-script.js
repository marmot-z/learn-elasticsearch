let asyncSeries = eval(pm.globals.get("asyncSeries"));
let createDocument = eval(pm.globals.get("createDocument"));
let docs = {
    "test1": {id: 1, name: "zhangsan", age: 18},
    "test2": {id: 1, date: '2022-09-21', count: 2},
    "test3": {id: 2, name: 'lisi', age: 29},
    "test4": {id: 2, date: '2022-09-23', count: 3}
};

// 创建多个索引多条数据
asyncSeries(
    Object.entries(docs)
    .map(([k, v]) => 
        (cb) => createDocument({
            indexName: k,
            doc: v,
            id: v.id
        }, cb)
    ), 
    (err, res) => {
        if (err) throw err;

        console.log('数据已创建');
    }
);
