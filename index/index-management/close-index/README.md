### close index

```
POST /my-index-000001/_close

```

你可以使用 close API 关闭索引，其会阻塞索引上的读写操作，以及不允许任何可以在正常状态索引上的操作。关闭的索引不会维护内部数据结构用于保存和查询文档，其会降低集群的消耗。使用通配符或者 _all 参数关闭多个索引。对已经关闭的索引执行查询等操作将会抛出 index_closed_exception 异常。     
当启动/关闭索引时，分片会执行恢复流程，以确保集群始终保留足够的分片副本。  
关闭索引会消耗大量的磁盘空间，可能会在部署环境中引发一些问题。

官方文档：[https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-close.html](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/indices-close.html)
