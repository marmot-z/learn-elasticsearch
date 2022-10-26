### update settings

更新索引 settings

```
PUT //_settings
```

请求参数：

- allow_no_indices
- expand_wildcards
- flat_settings
- ignore_unavailable
- preserve_existing
- master_timeout
- timeout
    

请求体：

索引 setting 分为两大类：

不可更改（只能在索引创建期间指定）：

- index.number_of_shards 主分片个数
- index.number_of_routing_shards
- index.codec 压缩算法，默认为 LZ4 算法。更新压缩算法，将于 segment 合并后生效
- index.routing_partition_size
- index.soft_deletes.retention_lease.period 在过期前保留分片历史的最长时间
- index.load_fixed_bitset_filters_eagerly
- index.shard.check_on_startup
    

可更改（可在索引运行期间更改）：

- index.number_of_replicas 主分片的副本数
- index.auto_expand_replicas 根据集群数据节点数扩展副本数量
- index.search.idle.after 分片多久没收到搜索和请求则被判定为搜索空闲状态的时间
- index.refresh_interval 执行刷新（使最近改动在索引上搜索可见）操作的间隔
- index.max_result_window 搜索时 from + size 的最大值
- index.max_inner_result_window
- ...
    

详见 [Index modules | Elasticsearch Guide \[7.17\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index-modules.html#index-modules-settings)
