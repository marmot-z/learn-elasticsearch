### match

可以使用 operator 参数设置为 or 或 and 来控制查询逻辑。当为 or 时查询命中分词中任意一个的 token ，既可返回对应的文档。当为 and 时查询命中分词后的全部 token 才可以返回对应的文档。

使用  [`minimum_should_match`](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/query-dsl-minimum-should-match.html) 参数可以指定最少匹配的 should 子句个数，具体参考演示样例。

使用 analyzer 参数可以指定查询前对文本进行分析所用的分词器。默认使用字段 mapping 定义的分词器或者索引的默认分词器。
