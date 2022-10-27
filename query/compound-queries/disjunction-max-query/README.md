### disjunction max query

如果返回的文档被多个查询子句匹配，dis_max 查询返回的文档分数 = 最匹配子句的分数 + 其他查询子项分数 \* tie_breaker。

**查询参数：**

- queries 一个或多个查询子句
- tie_breaker 一个介于 0 和 1 的浮点数，用于增加匹配多个查询子句文档的相关性分数，默认为 0
    

官方文档：[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-dis-max-query.html#query-dsl-dis-max-query](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-dis-max-query.html#query-dsl-dis-max-query)
