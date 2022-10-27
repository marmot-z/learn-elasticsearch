### constant score query

constant score query 是包装 filter query 的一类查询，查询返回的文档分数总是同 boost 参数一致。

**查询参数：**

- filter 所希望的 [Filter query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html) 查询
- boost 返回文档的分数浮点值，默认为 1.0
