### boolean query

boolean query 是由多个查询组合而成的文档查询，其对应于 Lucene 的 BooleanQuery。其有一个或多个子句组成，每个子句都有对应的类型：

- must
  
  该子句会匹配对应的文档，并贡献得分
  
- filter
  
  该子句会匹配对应的文档，但其不同于 must 的地方在于分数会被忽略，并且该子句会被缓存
  
- should
  
  该子句应该匹配对应的文档
  
- must_not
  
  该子句不会匹配对应的文档，由于运行于 filter context 中意味着分数将会被忽略且会被缓存
  

boolean query 采用'匹配尽可能多'的策略，每个文档最终的分数由 must 和 should 子句分数汇总而成。

minimum_should_match 参数用于指定 should 子句最少返回的文档数量。
