### get mapping

```
GET /<target>/_mapping

```

获取索引的 mapping 信息。 <target> 为目标索引，支持英文逗号分隔的多个索引名称，也可以使用 _all, * 通配符获取全部索引的 mapping 信息。

```
GET /<target>/_mapping/field/

```

获取索引字段的配置信息。 <target>为目标索引，具体用法同上所述。 为目标字段，支持英文逗号分隔的多个字段名称，也可以使用 _all, * 通配符获取全部字段的配置信息，另外还支持前缀和后缀通配符匹配，如：a* 匹配以 a 开头的字段，*id 匹配以 id 结尾的字段。
