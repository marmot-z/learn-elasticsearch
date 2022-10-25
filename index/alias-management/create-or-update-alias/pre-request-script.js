const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const createDocument = eval(pm.globals.get("createDocument"));
const loadDatas = eval(pm.globals.get("loadDatas"));
const options = {
    "indexName": "my-index-000001",
    "mappings": {
        "properties": {
            "user_identifier": {
                "type": "keyword"
            }
        }
    }
};
const docs = {
    "my-index-000001": [
        {"id": 1, "user_identifier": 1}
    ]
};

asyncSeries([
    // 创建 my-index-000001 索引
    cb => createIndex(options, cb),
    // 插入若干数据
    cb => loadDatas(docs, cb, 1000)
], (err, resp) => {
    if (err) throw err;
});
