### index document

index 作用：

- 如果文档不存在，则创建文档
- 如果文档存在，则删除旧文档，然后创建新文档，并将_version +1
    
index 与 update 区别：index 会覆盖原先的文档，而 update 只会更新部分字段
