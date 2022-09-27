### create index

创建索引请求格式如下：

```
PUT /my-index-000001
{
  "settings": {
    "index": {
      "number_of_shards": 3,  
      "number_of_replicas": 2 
    }
  },
  "mappings": {
    "properties": {
      "field1": { "type": "text" }
    }
  }
  "aliases": {
    "alias_1": {},
    "alias_2": {
      "filter": {
        "term": { "user.id": "kimchy" }
      },
      "routing": "shard-1"
    }
  }
}

```

索引名称需符合以下要求：

- 只能小写  
- 不能包含右侧字符：, /, \*, ?, ", <, >, |, (space character), ,, #  
- 不能以 -,_,+ 符号起始  
- 不能为 . 或者 ..  
- 不能超过 255 字节  
- 不能以 . 符号起始

查询参数：

- wait_for_active_shards 在发起请求前等待有效的分片数，可以为 all 或者\[1, number_of_replicas + 1\]  
- master_timeout 连接到主节点的超时时间，默认为 30s  
- timeout 响应超时时间

请求体：

- [aliases](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/aliases.html)
- [mappings](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/mapping.html)
- [settings](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index-modules.html#index-modules-settings)

官方文档：https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-create-index.html
