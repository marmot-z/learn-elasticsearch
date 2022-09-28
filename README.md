# learn-elasticsearch

本项目主要记录本人学习 ElasticSearch 的一些笔记，通过将 Restful 接口记录到 Postman 中，配合前置脚本对数据进行预加载和后置脚本对资源进行释放，可以确保每个 Restful 接口能够<u>**重复执行**</u>，方便后续的复习。

### 面向人群

此项目主要记录 ElasticSearch 的一些基础和典型的操作，仅适合于新手（具备一定的计算机和 JavaScript 基础）入门，不能帮助您更进一步的理解 ElasticSearch 相关原理。

### 版本

此项目所使用到的相关技术版本：

- ElasticSearch 7.17.0

- Postman 9.31.7

- JavaScript ES5+

- Docker 4.2.0 (70708)

### 如何使用

打开 Postman > File > Import，选中项目中的 [learn-elasticsearch.postman_collection.json](./learn-elasticsearch.postman_collection.json) 文件进行导入，导入成功后，在 Postman 左侧可以查看相关的目录与请求，然后按照下方的章节目录学习对应的章节。每个章节都包含对应的 pre-request-script.js（做依赖资源构建）、tests.js（资源释放和结果验证） 脚本和 README 文档。

### 章节目录

- [安装](./install)
- [索引操作](./index)
- [文档操作](./document)

### 说明

Elasticsearch 中标记为实验性、预发、废弃以及不在稳定版本中支持的功能（如：Simulate Index API、Freeze Index API）不会被演示，另外一些集群操作和复杂操作（如：Shrink Index Api）也不会被演示。

### 补充

本人才疏学浅，能力有限，难免存在一些纰漏。如果您有想要纠正或补充的章节，欢迎提交     issue 和 PR。

### License

本项目使用 MIT License
