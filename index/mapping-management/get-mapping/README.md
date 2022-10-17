### get index mapping

```
GET /<target>/_mapping

```

获取索引 mapping，<target>可以为英文逗号分隔的多个索引名称，也可以使用通配符 \* 或 _all 参数匹配全部索引。

**查询参数：**

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
- local 
如果为 true 则从本地节点获取索引 mapping 信息，默认为 false，从主节点获取索引信息
- master_timeout 
连接到主节点的等待时间，超过改时间则请求失败并返回异常，默认为 30s
