### field properties vs multi field

field properties 和 multi field 的区别：

- 当 field 类型为 object 或 nested 类型时，可以通过 properties 属性指定子字段（object field 和 nested field 的区别请阅读 [nested field vs object field](../../../../examples/nested-field-vs-object-field)章节
- 当同一个字段出于不同目的需要不同的使用方式，则可以使用 multi field，比如为字段设置 text 类型，可以方便全文搜索，扩大命中概率；为字段再设置 keyword 类型，可以方便排序和聚合。不同字段类型还可以使用不同的分词器（analyzer）
