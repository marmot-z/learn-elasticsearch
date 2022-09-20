### bulk 
bulk 能同时执行多条命令
- 部分命令报错不会影响另一部分命令的执行
- 每条命令使用 \n 分隔（最后一条命令也要使用 \n 结尾）
- 可以指定默认目标索引，没有 _index 参数的命令会使用默认目标索引

官方文档：https://www.elastic.co/guide/en/elasticsearch/reference/7.17/docs-bulk.html
