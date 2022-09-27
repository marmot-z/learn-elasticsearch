### multi search

msearch 可以在一个请求中进行多个查询，其请求格式如下：
```
GET /_search
header\n
body\n
header\n
body\n
```
请求内容中每一行由换行符分隔（包括最后一行），请求头 `Content-type` 为 `application/x-ndjson`


1.  target_index 是查询目标索引，当查询 header 为空则默认使用此索引。其支持使用通配符，也可以为空;
2.  header 可以进行一些查询的配置，如：
    -   index 指定查询索引
    -   routing 指定路由
    -   search_type 查询类型（使用本地还是全局的 term 和文档频率进行算分）
    -   ...
3.  body 记录查询参数：
    -   aggregation 聚合方式
    -   query 查询参数，同一般查询 DSL
    -   from 分页起点
    -   size 分页大小

更多详情请参阅官方文档 [https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-multi-search.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/search-multi-search.html)
