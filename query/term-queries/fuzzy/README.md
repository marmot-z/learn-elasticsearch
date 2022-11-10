### fuzzy query

fuzzy 查询可以用来模糊查询，返回包含与搜索词相似词的文档，以 [Levenshtein 编辑距离](https://blog.csdn.net/UbuntuTouch/article/details/101287399) 测量。编辑距离是将一个术语转换为另一个术语所需的字符更改次数，包括：

- 更改字符（box -> fox）
- 删除字符（black -> lack）
- 插入字符（sic -> sick）
- 转置临近的字符（act -> cat）
    

**请求参数**

- fuzziness 其可以为 auto 或数字。当为数字时，其代表查询文本和文档内容可以相差的 levenshtein 编辑距离。为 atuo 时，字符串的长度大于 5，则 fuzziness 值自动设置为 2，字符串小于 2，则 fuzziness 值设置为 0
- ....
    

模糊查询会有很高的 CPU 开销，当 [`search.allow_expensive_queries`](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl.html#query-dsl-allow-expensive-queries) 设置为 false，不会执行模糊查询
