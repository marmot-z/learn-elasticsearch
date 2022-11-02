### match phrase prefix query

match phrase prefix 查询会以查询文本的最后一个词为前缀，匹配以该词开头的文档，返回的文档内容必须同查询文本单词顺序一致。

使用 match_phrase_prefix 可能会有一个问题：如果查询文本是 'quick brown f'，其会创建一个包含 quick、brown 两个词的短语（phrase）查询，并且从存储的词典中找到前 50 个以 'f' 开头的词加入到短语查询中。如果前 50 个以 'f' 为开头的词中不包含 'fox' 则无法查找到 'quikc brown fox' 文档。不过这一般不是问题：随着用户输入更多的字母这个词最终会被显示。或者使用 [completion suggester](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-suggesters.html#completion-suggester) 和[`search_as_you_type` field type](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-as-you-type.html) 能更好的解决此问题。
