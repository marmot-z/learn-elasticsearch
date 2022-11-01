### match phrase query

match_phrase 查询不同于 match 在查询前将文本解析成若干个词条，其会将查询文本作为整个语句进行查询，精确匹配的文档内容顺序和查询文本一致。

可以使用 slop 参数调整 match_phrase 的匹配结果，如 slop 设置为 2，输入 "I like riding" 可以匹配到  "I like swimming and riding!" 文档。
