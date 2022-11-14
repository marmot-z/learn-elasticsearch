# learn-elasticsearch

本项目主要通过 postman 记录本人学习的 ElasticSearch 一些接口。在 postman 中使用前置脚本对需查询数据进行预加载

![](./img/prescript.gif)

再通过后置脚本对查询结果进行验证并对资源进行释放

![后置脚本](./img/tests.gif)

再佐以文档解释接口作用和参数

![document](./img/document.gif)

来练习熟悉 ElasticSearch 常用的 Restful 接口，并确保接口能<u>**重复执行**</u>，方便后续的复习。

### 声明

此项目主要记录 ElasticSearch 的一些基础和典型的操作，仅适合于新手（具备一定的计算机和 JavaScript 基础）入门，不能帮助您更进一步的理解 ElasticSearch 相关原理。

### 如何使用

1. 下载本项目，并进入目录
   
   ```shell
   git clone https://github.com/marmot-z/learn-elasticsearch.git
   cd ./learn-elasticsearch
   ```

2. 安装 [docker](https://docs.docker.com/desktop/install/mac-install/)，启动 elasticsearch 和 kibana
   
   ```shell
   docker-compose up
   ```

3. 安装 [postman](https://www.postman.com/downloads/)，导入 collection.json 文件
   
   打开 postmane > File > Import > File > select File ，选择项目中 learn-elasticsearch.postman_collection.json 文件进行导入
   
   ![import](./img/import.gif)

4. 运行对应的请求
   
   ![execute](./img/execute.gif)

每个请求中都可以点击对应的 Pre-request script、Tests以及右侧的Documentation查看对应的脚本和文档内容。

### 版本

此项目所使用到的相关技术版本：

- ElasticSearch 7.17.0

- Postman 9.31.7

- JavaScript ES5+

- Docker 4.2.0 (70708)

### 章节目录

- [安装](./install)
  - 验证 elasticsearch 版本
- [索引操作](./index)
  - 索引管理
    - 获取索引信息
    - 打开索引
    - 创建索引
    - 删除索引
    - 复制索引
    - 关闭索引
    - 查询索引
  - mapping 管理
    - 获取 mapping
    - 更新mapping
      - 添加字段
      - 已有字段添加属性
      - 已有字段添加子字段
      - 修改已有字段的 mapping 配置
      - 重命名字段
  - alias 管理
    - 获取别名
    - 删除别名
    - 创建/更新别名
  - settings 管理
    - 更新索引 settings
    - 分词器（analyze）使用
- [文档操作](./document)
  - 创建文档
  - 索引文档
  - 更新文档
  - 获取文档
  - 删除文档
  - 批量查询文档
  - 批量操作文档
  - 批量获取文档
- [文档查询](./query)
  - 组合查询
    - 布尔查询
    - 权重查询
    - 常量查询
    - 单字符串多字段查询（disjunction max）
  - 全文查询
    - match 查询
      - 匹配查询（match query）
      - 模糊查询（match fuzziness query）
      - zero terms query
      - 同义词查询（synonyms）
    - 文本查询（match phrase query）
    - 前缀查询（match phrase prefix query）
    - 布尔前缀查询（match bool prefix query）
    - 组合字段查询（combined fields）
  - 术语查询
    - 是否存在查询
    - 模糊查询
    - id 批量获取

### License

本项目使用 MIT License
