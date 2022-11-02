const queryText = 'evil Imperial forces';
const body = pm.response.json();
const stopwords = ['and', 'the', 'of', 'a'];

function cacluteSlop(pharse1, pharse2) {
    let arr1 = pharse1.toLowerCase()
                    .split(/,?\s+/)
                    // filter stop word
                    .filter(w => stopwords.indexOf(w) < 0);
    let arr2 = pharse2.toLowerCase()
                    .split(/,?\s+/)
                    .filter(w => stopwords.indexOf(w) < 0);

    // 查找 arr1 的起始词在 arr2 的位置
    let startIndex = arr2.indexOf(arr1[0]);
    // 比对 arr1 的结束词在 arr2 的位置
    let endIndex = arr2.indexOf(arr1[arr1.length - 1], 0);
    // 匹配到的文本长度 = 结束位置 - 起始位置 + 1（起始角标为 0）
    let matchPharseLength = (endIndex - startIndex) + 1;

    // 计算查询文本和结果文本的差距
    return matchPharseLength - arr1.length;
}

pm.test('match pharse query successful', () => {
    // 验证查询文本和匹配文本前缀一致
    pm.expect(cacluteSlop(queryText, body.hits.hits[0]._source.overview)).eq(0);
});
