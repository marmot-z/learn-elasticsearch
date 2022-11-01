### match boolean prefix query

match_bool_prefix 查询会将输入文本分析后的词（term）构造成 bool 查询，最后一个词会被用于 prefix 查询，其他词会被作为 term 查询。

```
GET /_search
{
  "query": {
    "match_bool_prefix" : {
      "message" : "quick brown f"
    }
  }
}
```

上述查询类似于以下 bool 查询：

```
GET /_search
{
  "query": {
    "bool" : {
      "should": [
        { "term": { "message": "quick" }},
        { "term": { "message": "brown" }},
        { "prefix": { "message": "f"}}
      ]
    }
  }
}
```

match_bool_prefix 查询和 match_pharse_prefix 查询的区别在于：match_pharse_prefix 查询以短语（pharse）的方式进行匹配，而 match_bool_prefix 使用分词后的词进行匹配，其可以匹配 'quick fox brown'、'fox quick brown'、'quick'、'brown'、'f' 等多种文档

**查询参数**：

- minumum_should_match
- operator
    

参数含义同 match 查询参数，以下此参数也同步 match 查询参数，但不会应用于最后一个词（term）的前缀（prefix）查询

- fuzziness
- prefix_length
- max_expansions
- fuzzy_transpositions
- fuzzy_rewrite
