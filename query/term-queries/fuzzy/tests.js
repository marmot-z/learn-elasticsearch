const levenshtein = eval(pm.globals.get("levenshtein"));
const body = pm.response.json();

pm.test('fuzzy query successful', () => {
    // 只命中一个，另一个 Levenshtein 距离不符合查询要求
    pm.expect(body.hits.total.value).eq(1);

    // 此两者 Levenshtein 距离为 2，故 fuzziness 为 1 查询不到
    pm.expect(levenshtein('Metropolis', 'Metropoiles')).eq(2);

    // 此两者 Levenshtein 距离为 2，fuzziness 为 auto 时，
    // 长度大于 5 字符串时，fuzziness 设置为 2，所以可以匹配到
    let doc = body.hits.hits[0]._source;
    let title = doc.title.toLowerCase().split(' ')[2];
    pm.expect(levenshtein(title, 'elementes')).eq(2);
});
