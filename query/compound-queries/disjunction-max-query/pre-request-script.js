const asyncSeries = eval(pm.globals.get("asyncSeries"));
const createDocument = eval(pm.globals.get("createDocument"));
const loadDatas = eval(pm.globals.get("loadDatas"));
const docs = {
    'my-index-000001': [
        {
            id: 1, 
            title: 'Quick brown rabbits', 
            body: 'Brown rabbits are commonly seen'
        },
        {
            id: 2,
            title: 'Keeping pets healthy', 
            body: 'My quick brown fox eats rabbits on a regular basis'
        }
    ]
};

asyncSeries([
    cb => loadDatas(docs, cb, 1000)
], (err, resp) => {
    if (err) throw err;
});
