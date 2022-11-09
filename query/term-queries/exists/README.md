### exists query

返回字段中包含指定值的文档。

索引内容不存在文档可能有以下几个原因：

- 字段源内容 json 中为 null 或者 \[\]（空数组）
- 字段 mapping 设置为 "index": false
- 字段值超过了 mapping 中的 ignore_above 配置
- 字段值格式异常，并且 mapping 中配置了 ignore_malformed
    

如果你想查询不包含指定值的文档，你可以搭配使用 bool query 中的 must_not 查询
