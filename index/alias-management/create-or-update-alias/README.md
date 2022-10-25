### create or update alias

创建或更新索引

```
POST <alias>/_alias/<target>
POST <alias>/_aliases/<target>
PUT <alias>/_alias/<target>
PUT <alias>/_aliases/<target>

```

**路径参数**

- alias 更新后的别名，如果别名不存在，则请求创建别名。别名名称支持\[日期数学（date math）\]([https://www.elastic.co/guide/en/elasticsearch/reference/7.17/date-math-index-names.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/date-math-index-names.html))
- target 待添加的逗号分隔的索引、数据流列表，支持通配符
    

**请求参数**

- master_timeout 连接主节点的等待时间，默认 30s
- timeout 等待响应的等待时间，默认 30s
    

**请求体**

- filter 使用 Query DSL 指定别名可以查询的文档
- index_routing 将索引（indexing）数据操作路由到指定分片
- routing 将索引、查询数据操作路由到指定分片
- search_routing 将查询数据操作路由到指定分片
- is_hidden 如果为 true，别名将被隐藏
- is_write_index 如果为true，则别名设置可写的索引，即通过此别名向对应的索引写入数据