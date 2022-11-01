### match

match 是常用的全文搜索查询，包括可选的模糊（fuzzy）匹配，其在查询前会对查询文本进行分析（analyzed）。

**查询参数**：

- query 查询文本
- analyzer 分词器，用于将查询文本转换为词（token）。默认使用字段上的分词器，如果没有则使用索引上的分词器
- fuzziness 最大可匹配的编辑长度（edit distance）
- max_expansions
- prefox_length 不被模糊化的初始字符数量
- lenient 如果为 true，查询数据不匹配且转换异常会报错
- operator 查询时布尔逻辑，AND 代表匹配分词后的全部词，OR 代表匹配分词后的任意词
- minimum_should_match 返回的文档至少匹配的查询子句
- zero_terms_query 如果分词器过滤了所有词（toekn，例如查询文本全是停止词 ）时查询文档的策略，all 返回所有文档，none 不返回文档
- ...
    

参考文档：

- [Match query | Elasticsearch Guide \[7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-match-query.html)
- [https://segmentfault.com/a/1190000017110948](https://segmentfault.com/a/1190000017110948)
