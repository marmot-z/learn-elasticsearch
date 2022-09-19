#!/bin/bash

# 拉取镜像
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.17.0

# 启动镜像
docker run -d --name es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.17.0 