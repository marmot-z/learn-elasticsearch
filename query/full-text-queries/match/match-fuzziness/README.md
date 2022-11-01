### match fuzziness

fuzziness 参数可以在 match 查询时模糊匹配对应的文档。比如查询文本为 'rooom' ，其可以匹配包含 'room' 单词的文档。

可以使用 prefix_length 和 max_expansions 参数来控制模糊查询过程：

prefix_length 参数可以指定不被模糊化的字符前缀长度，如：prefix_length 为 2 ，则 rale 不能模糊化为 rule，但可以模糊化为 raw。

max_expansions 参数可以指定最多被模糊匹配词的个数。

参考文档： [https://www.elastic.co/cn/blog/found-fuzzy-search](https://www.elastic.co/cn/blog/found-fuzzy-search)
