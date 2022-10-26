const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createIndex = eval(pm.globals.get("createIndex")); 
const indexName = 'tmdb';
const indexOptions = {
    indexName,
    "settings": {
        "number_of_shards": 1
    },
    "mappings": {
        "properties": {
            "overview": {
                "type": "text",
                "analyzer": "english",
                "fields": {
                    "std": {
                        "type": "text",
                        "analyzer": "standard"
                    }
                }
            },
            "popularity": {
                "type": "float"
            },
            "title": {
                "type": "text",
                "analyzer": "english",
                "fields": {
                    "keyword": {
                        "type": "keyword",
                        "ignore_above": 256
                    }
                }
            }
        }
    }
};

function importData2es(indexName, datas, cb) {
    // datas 不是数组，手动计算总数
    let count = 0;
    let bulkBody = datas.map(data => {
        ++count;
        return  `{"index": {"_index": "${indexName}", "_id": ${data.key} }}\n${JSON.stringify(data.value)}\n`;
    })
    .join('');

    pm.sendRequest({
        url: `${pm.collectionVariables.get('esHost')}/${indexName}/_bulk`,
        method: 'POST',
        header: {
            'Content-Type': 'application/json'
        },
        body: {
            mode: 'raw',
            raw: bulkBody
        }
    }, (err, resp) => {
        if (err) throw err;

        let respBody = resp.json();

        if (respBody.status < 200 || 
                respBody.status >= 300 ||
                respBody.errors) 
            throw new Error('批量导入数据失败');

        cb(null, count);
    });
}

function setup() {
    let externalData = pm.iterationData.values;
    let startMills = new Date().getTime();

    if (!externalData) {
        throw new Error('请先导入 tmdb.json 文件');
    }

    asyncSeries([
        // 创建 tmdb 索引
        cb => createIndex(indexOptions, cb),
        // 将导入的 json 数据写入到索引中
        cb => importData2es(indexName, externalData, cb)
    ], (err, resp) => {
        if (err) throw err;

        let endMillis = new Date().getTime();

        console.log(`创建 ${indexName} 索引成功`);
        console.log(`共往 ${indexName} 索引导入了 ${resp[1]} 条数据，耗时 ${(endMillis - startMills) / 1000} ms`);
    });
}

setup();
