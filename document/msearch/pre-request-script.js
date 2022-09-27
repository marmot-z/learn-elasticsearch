let asyncSeries = eval(pm.globals.get("asyncSeries"));
let createDocument = eval(pm.globals.get("createDocument"));
let loadDatas = eval(pm.globals.get("loadDatas"));

let docs = {
    'test1': [
        {'id': 1, 'tag': 'blogging', 'content': 'we bought a house, so I was moving'},
        {'id': 2, 'tag': 'job', 'message': 'learning to get better at by job'},
        {'id': 3, 'tag': 'programming', 'message': 'I feel I should have at my job level'}
    ],
    'test2': [
        {id: 1, autor: 'john', comments: ['good', 'bad']},
        {id: 2, autor: 'tom', comments: ['pretty good', 'normal']},
    ]
};      

loadDatas(docs, (err, resp) => {
    if (err) throw err;

    console.log('数据创建完毕');
    
// 数据创建完后等待 1000 ms 再查询
}, 1000);
