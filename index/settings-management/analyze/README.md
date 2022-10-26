### analyze

对文本字符进行分析返回结果标记（token）

```
GET /_analyze

POST /_analyze

GET /<index>/_analyze

POST /<index>/_analyze
```

**请求参数：**

- analyzer应用于文本解析的分词器，其可以为内置分词器（[Built-in analyzer reference](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-analyzers.html)），或者是索引中配置的分词器。
    - 当此参数没有指定时，使用字段上定义的分词器
    - 当字段（field）没有指定时，使用索引的默认分词器
    - 当索引没有指定或索引没有默认的分词器时，使用标准分词器（[Standard analyzer](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-standard-analyzer.html) ）
- attributes
- char_filter字符过滤器，在 tokenizer 之前进行字符前置处理，见 [Character filters reference | Elasticsearch Guide \[7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-charfilters.html)
- filter过滤器，在 tokenizer 之后对 token 进行过滤，见 [Token filter reference | Elasticsearch Guide \[7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-tokenfilters.html)
- normalizer将文本归一化为单个 token，见 [https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-normalizers.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-normalizers.html)
- tokenizer将文本转换为 token，见 [_Tokenizer reference_](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/analysis-tokenizers.html)
- explain如果为 true，返回解析 token 详情
- field分词器所属的字段，需先指定索引名称
- text
    待分析的文本
    

更多参见官方文档：[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-analyze.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-analyze.html)
