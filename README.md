# learn-elasticsearch

本项目主要记录本人学习 ElasticSearch 的一些笔记，通过将 Restful 接口记录到 Postman 中，再配合一些脚本的构建和资源释放，可以确保每个 Restful 接口可以***<u>重复执行</u>***，方便后续的回顾。



### 面向人群

此项目主要记录 ElasticSearch 的一些基础和典型的操作，仅适合于新手（具备一定的计算机和 JavaScript 基础）入门，不能帮助您更进一步的理解 ElasticSearch 相关原理。



### 版本

此项目所使用到的相关技术版本：

- ElasticSearch 7.17.0

- Postman 9.31.7

- JavaScript Es5



### 如何使用

打开 Postman > File > Import，选中项目中的 [learn-elasticsearch.postman_collection.json](./learn-elasticsearch.postman_collection.json) 文件进行导入，导入成功后，在 Postman 左侧可以查看相关的目录与请求，然后按照下方的章节目录学习对应的章节。每个章节都包含对应的 pre-request-script.js（做依赖资源构建）、tests.js（资源释放和结果验证） 脚本和 README 文档。



### 章节目录

- [安装](./install)
- [文档](./document)



### 补充

本人才疏学浅，能力有限，难免存在一些章节的遗漏。如果您有想要补充的章节，欢迎提交issue 和 PR。



### License

本项目使用 MIT License
