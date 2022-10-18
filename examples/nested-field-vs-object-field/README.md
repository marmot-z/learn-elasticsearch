### field: nested vs object

[nested field](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/nested.html) 和 [object field](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/object.html) 类型字段看起来都是对象类型的字段，那它们有什么区别？应该怎么选择？

es 在存储的时候会将文档中的 object 类型的字段进行展开，比如我们往索引中插入以下数据：

``` json
PUT books_test/_doc/1
{
  "name": "An Awesome Book",
  "tags": [{ "name": "best-seller" }, { "name": "summer-sale" }],
  "authors": [
    { "name": "Gustavo Llermaly", "age": "32", "country": "Chile" },
    { "name": "John Doe", "age": "20", "country": "USA" }
  ]
}
PUT books_test/_doc/2
{
  "name": "A Regular Book",
  "tags": [{ "name": "free-shipping" }, { "name": "summer-sale" }],
  "authors": [
    { "name": "Regular author", "age": "40", "country": "USA" },
    { "name": "John Doe", "age": "20", "country": "USA" }
  ]
}

```

其在 es 中实际存储的结构类似于：

``` json
{
  "name": "An Awesome Book",
  "tags.name": ["best-seller", "summer-sale"],
  "authors.name": ["Gustavo Llermaly", "John Doe"],
  "authors.age": [32, 20],
  "authors.country": ["Chile, USA"]
}

```

在一些查询中这会出现问题，如果我们查询 country 为 chile 且 age 小于 30 的记录，期待返回零条记录，但实际会返回两条记录。这会导致一些问题，该如何解决这个问题？

改用 nested 类型的字段，其是一种特殊对象类型的字段，es 会将 nested 类型的字段单独存储为一个文档，并与对应的外部文档进行关联，因此我们可以对其正确进行查询。

**注意：**

- 每个索引最多有 50 个 nested 类型的字段，可以通过 index.mapping.nested_fields.limit 参数调整
- 每个文档最多有 1000 个 nested 类型的对象，可以通过 index.mapping.nested_objects.limit 参数调整
- 过多的 nested 类型字段会导致性能下降，在需要的时候再使用 nested 类型字段
- 使用 [flattened field type](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/flattened.html) 类型字段将内部对象的所有关键词类型字段映射到单个字段上
    

参考文档：[elasticsearch-nested-field-object-field](https://opster.com/guides/elasticsearch/data-architecture/elasticsearch-nested-field-object-field/)
