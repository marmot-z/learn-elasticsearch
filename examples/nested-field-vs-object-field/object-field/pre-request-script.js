const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createDocument = eval(pm.globals.get("createDocument"));
const loadDatas = eval(pm.globals.get("loadDatas"));
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

// 往索引上插入两条嵌套对象类型的文档
loadDatas(docs, (err, resp) => {
    if (err) throw err;
    
// 数据创建完后等待 1000 ms 再查询
}, 1000);
