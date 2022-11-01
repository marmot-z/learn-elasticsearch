const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex"));
const createDocument = eval(pm.globals.get("createDocument"));
const indexOptions = {
    "indexName": "my-index-000001",
    "settings": {
        "index" : {
            "analysis" : {
                "analyzer" : {
                    "synonym" : {
                        "tokenizer" : "whitespace",
                        "filter" : ["synonym"]
                    }
                },
                "filter" : {
                    "synonym" : {
                        "type" : "synonym",
                        "synonyms" : [
                            "USA, united states of America"
                        ]
                    }
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "message": {
                "type": "text",
                "analyzer": "synonym"
            }
        }
    }
};
const doc = {
    "indexName": "my-index-000001",
    "id": 1,
    "doc": {
        "message": "united states of America people"
    }
};

asyncSeries([
    cb => createIndex(indexOptions, cb),
    cb => createDocument(doc, cb),
    // wait 1 s
    cb => setTimeout(cb, 1000)
], (err, resp) => {
    if (err) throw err;
});
