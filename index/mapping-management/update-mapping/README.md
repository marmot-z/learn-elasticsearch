### update index mapping

```
PUT /<target>/_mapping

```

更新指定索引的 mapping， <target> 支持逗号分隔的多个索引名称，或使用 \* 和 _all 通配符应用于所有索引上

**请求参数：**

- allow_no_indices  
    是否允许索引不存在。如果为 false，且索引不存在或者关闭，则请求返回错误。默认为 true
- expend_wildcards  
    通配符模式可以匹配的索引类型，支持逗号分隔的多个类型，默认为 open
    - all  
        匹配全部索引（包括隐藏的索引）
    - open  
        匹配开启的，未隐藏的索引
    - closed  
        匹配关闭的，为隐藏的索引
    - hidden  
        匹配隐藏的索引
    - none  
        不匹配任何索引
- include_type_name  
    期待 mapping body 里有 mapping type，默认为 false
- ignore_unavailable  
    如果为 false 且目标索引不存在或关闭则请求返回错误，默认为 false
- master_timeout  
    连接到主节点的等待时间，超过改时间则请求失败并返回异常，默认为 30s
- timeout  
    响应等待时长，超时则请求失败并返回异常，默认为 30s
- write_index_only  
    如果为 true 则只会对可写索引进行 mapping 更新，默认为 false
    

**请求体：**  
properties 参数可以包括以下内容：

- 字段名称
- [字段类型](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/mapping-types.html)
- [mapping 参数](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/mapping-params.html)
    

具体的更新操作如下：

- [新增索引字段](./add-field)
- [在已存在字段上新增配置](./add-properties-to-existing-field)
- [在已存在字段上新增多字段](./add-multi-fields-to-existing-field)
- [修改已存在字段的参数](./change-mapping-parameters-for-existing-field)
- 修改已存在字段的 mapping
因为数据已被索引，所以修改已存在的字段类型是无效的。但可以用新的 mapping 创建新索引，然后将数据重索引(reindex)到新索引上，见[原文](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-put-mapping.html#updating-field-mappings)
- [重命名已存在字段](./rename-existing-field)
    

官方文档：[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-put-mapping.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-put-mapping.html)
