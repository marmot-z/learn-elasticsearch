### boosting query

boostring query 返回 postive 查询匹配的文档，并降低 negative 匹配文档的相关分数。你可以使用该查询降低某些文档的分数，而不会将它们从搜索结果中排除。

boosting query 的三个顶级参数：

- positive该查询返回匹配的文档
- negative该查询降低匹配文档的相关分数
- negative_boost
    降低文档分数的浮点数权重值，介于 0 与 1 之间
