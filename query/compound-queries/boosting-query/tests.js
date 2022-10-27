const body = pm.response.json();

pm.test('boosting query successful', () => {
    let hits = body.hits.hits;
    let fourRoomsDoc = hits.find(doc => 
        doc._source.title.match(/four rooms/i)
    );
    let babyDoc = hits.find(doc => 
        doc._source.title.match(/.*baby.*/i)
    );

    // 根据 four rooms baby 查询
    // four rooms(5) 数据匹配度更高，分数本应更高，
    // 但是由于其又命中了 negative 相关查询，分数被降低，
    // 所以其最终的分数反而小于 Rosemary's Baby(805) 数据
    pm.expect(fourRoomsDoc._score).to.be.below(babyDoc._score);
});
