### multi get

multi get 可以同时获取多条数据

- 指定默认索引
`GET /test/_mget`  
- 使用 ids 查询指定 id 的数据  
```
GET /test/_mget
{
   "ids": ["1", "2"]
}
```
- 使用 docs 获取指定文档
    - 使用 _source 指定返回字段  
    - 使用 _index 指定返回字段

官方文档：[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/docs-multi-get.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/docs-multi-get.html)
