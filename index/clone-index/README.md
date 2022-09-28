### clone index

clone index 可以拷贝已有索引生成新的索引

#### 拷贝前提要求

\*   目标索引不存在
\*   目标索引和源索引分片数一致
\*   处理拷贝索引的节点有足够的磁盘空间完成已有索引的拷贝
    

#### 说明

\*   索引模板不会应用于目标索引
\*   目标索引不会拷贝源索引的元信息(metadata)
\*   拷贝会赋值绝大部分源索引配置到目标索引中，但 index.number_of_replicas 和 index.auto_expand_replicas 配置除外，可以在 clone 请求中指定此参数
    

#### 拷贝流程

\*   unassigned 各分片尚未分配
\*   initializing 主分片已分配
\*   active 主分片拷贝完成，es 将尝试拷贝分片副本和将主分片重定位到其他节点
    

可以使用 _cat recovery API 查看进度

#### 请求参数：

与 create index 参数类似，可以在请求体中指定 settings 和 aliases 参数，但不能指定 mapping 参数

官方文档：[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-clone-index.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-clone-index.html)
