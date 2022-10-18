const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const createDocument = eval(pm.globals.get("createDocument"));
const loadDatas = eval(pm.globals.get("loadDatas"));
const indexOptions = {
    "indexName": "books_test",
    "mappings": {
        "properties": {
            "authors": {
                "type": "nested"
            }
        }
    }
};
const docs = {
    'books_test': [
        {
            "id": 1,
            "name": "An Awesome Book",
            "tags": [{ "name": "best-seller" }, { "name": "summer-sale" }],
            "authors": [
                { "name": "Gustavo Llermaly", "age": "32", "country": "Chile" },
                { "name": "John Doe", "age": "20", "country": "USA" }
            ]
        },
        {
            "id": 2,
            "name": "A Regular Book",
            "tags": [{ "name": "free-shipping" }, { "name": "summer-sale" }],
            "authors": [
                { "name": "Regular author", "age": "40", "country": "USA" },
                { "name": "John Doe", "age": "20", "country": "USA" }
            ]
        }
    ]
};      

asyncSeries([
    // 明确指定 author 字段为 nested 类型，防止 es 自动判别为 object 类型
    cb => createIndex(indexOptions, cb),
    cb => loadDatas(docs, cb, 1000)
], (err, resp) => {
    if (err) throw err;
});
