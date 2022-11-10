const levenshtein = eval(pm.globals.get("levenshtein"));
const body = pm.response.json();

pm.test('match fuzziness query successful', () => {
    pm.expect(body.hits.hits.length).eq(1);

    let title = body.hits.hits[0]._source.title.toLowerCase();
    let tokens = title.split(' ');

    // prefix_length 为 2，代表至少前缀 2 个字符一致
    pm.expect(tokens[0].substring(0, 2)).eq('fourr'.substring(0, 2));
    pm.expect(tokens[1].substring(0, 2)).eq('romms'.substring(0, 2));

    // token 的编辑距离小于等于 2
    pm.expect(levenshtein('fourr', 'four')).to.be.lte(2);
    pm.expect(levenshtein('romms', 'room')).to.be.lte(2);
});
