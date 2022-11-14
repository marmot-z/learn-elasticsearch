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
            },
            "tagline": {
                "type": "text",
                "analyzer": "english",
                "fields": {
                    "std": {
                        "type": "text",
                        "analyzer": "standard"
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
    // 只初始化一次
    if (pm.collectionVariables.get('tmdb.inited')) {
        return;
    }

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

        delete externalData;

        console.log(`创建 ${indexName} 索引成功`);
        console.log(`共往 ${indexName} 索引导入了 ${resp[1]} 条数据，耗时 ${(new Date().getTime() - startMills) / 1000} ms`);
    });

    pm.collectionVariables.set('tmdb.inited', true);
}

setup();

/**
 * calculate levenshtein edit distance
 * 
 * @see https://stackoverflow.com/questions/18516942/fastest-general-purpose-levenshtein-javascript-implementation
 */
const levenshtein = (s, t) => {
    if (s === t) {
        return 0;
    }
    var n = s.length, m = t.length;
    if (n === 0 || m === 0) {
        return n + m;
    }
    var x = 0, y, a, b, c, d, g, h;
    var p = new Uint16Array(n);
    var u = new Uint32Array(n);
    for (y = 0; y < n;) {
        u[y] = s.charCodeAt(y);
        p[y] = ++y;
    }

    for (; (x + 3) < m; x += 4) {
        var e1 = t.charCodeAt(x);
        var e2 = t.charCodeAt(x + 1);
        var e3 = t.charCodeAt(x + 2);
        var e4 = t.charCodeAt(x + 3);
        c = x;
        b = x + 1;
        d = x + 2;
        g = x + 3;
        h = x + 4;
        for (y = 0; y < n; y++) {
            a = p[y];
            if (a < c || b < c) {
                c = (a > b ? b + 1 : a + 1);
            }
            else {
                if (e1 !== u[y]) {
                    c++;
                }
            }

            if (c < b || d < b) {
                b = (c > d ? d + 1 : c + 1);
            }
            else {
                if (e2 !== u[y]) {
                    b++;
                }
            }

            if (b < d || g < d) {
                d = (b > g ? g + 1 : b + 1);
            }
            else {
                if (e3 !== u[y]) {
                    d++;
                }
            }

            if (d < g || h < g) {
                g = (d > h ? h + 1 : d + 1);
            }
            else {
                if (e4 !== u[y]) {
                    g++;
                }
            }
            p[y] = h = g;
            g = d;
            d = b;
            b = c;
            c = a;
        }
    }

    for (; x < m;) {
        var e = t.charCodeAt(x);
        c = x;
        d = ++x;
        for (y = 0; y < n; y++) {
            a = p[y];
            if (a < c || d < c) {
                d = (a > d ? d + 1 : a + 1);
            }
            else {
                if (e !== u[y]) {
                    d = c + 1;
                }
                else {
                    d = c;
                }
            }
            p[y] = d;
            c = a;
        }
        h = d;
    }

    return h;
}

postman.setGlobalVariable('levenshtein', levenshtein);
