#!/bin/bash
# 解析 postman_collection.json 文件生成对应的文件夹内容
# author: zhangxunwei
# date: 2022-09-18

# 解析全局配置
function resolveGlobal() {
	cat learn-elasticsearch.postman_collection.json | jq -c '.event[]' | while read event; do
		resolvePrerequestTestsScript "." "$event"
	done

	cat learn-elasticsearch.postman_collection.json | jq -c '.item[]' | while read item; do
		resolveFloder "$item"
	done
}

# 解析 pre-request 和 tests 脚本
# $1 文件所在的相对路径
# $2 event json
function resolvePrerequestTestsScript() {
	parent_path="$1"
	event="$2"

	if [ -z "$event" -o "$event" = " " ]; then
		return
	fi

	val=$(jq -r '.listen' <<< "$event")
		
	if [ "$val" = "prerequest" ]; then
		createIfAbsent 1 "$parent_path/pre-request-script.js"

		script=$(jq -r '.script | (.exec | join("\n"))' <<< "$event")

		if [ ! -z "$script" -a "$script" != " " ]; then
			echo "写入 $parent_path/pre-request-script.js 脚本"
			echo "$script" > "$parent_path/pre-request-script.js"
		fi
	
	# 如果为 test 创建 test.js 	
	elif [ "$val" = "test" ]; then
		createIfAbsent 1 "$parent_path/tests.js"

		script=$(jq -r '.script | (.exec | join("\n"))' <<< "$event")

		if [ ! -z "$script" -a "$script" != " " ]; then
			echo "写入 $parent_path/tests.js 脚本"
			echo "$script" > "$parent_path/tests.js"
		fi
	fi
}

# 创建文件夹或文件如果其不存在
# $1 文件类型：0 文件夹 1 文件
# $2 文件相对路径
function createIfAbsent() {
	if [ $1 -eq 0 ]; then
		if [ ! -d "$2" ]; then
			echo "$2 文件夹不存在，创建"
			mkdir "$2"
		fi
	elif [ $1 -eq 1 ]; then
		if [ ! -f "$2" ]; then
			echo "$2 文件不存在，创建"
			touch "$2"
		fi
	fi
}

# 解析文件夹
# $1 floder json
function resolveFloder() {
	folder_name=$(jq -r '.name' <<< "$1" | tr " " "-")

	echo "处理 ./$folder_name 文件夹"

	createIfAbsent 0 "$folder_name"

	# 判断是否有 event 属性
	jq -c 'select(.event != null) | .event[]' <<< "$1" | while read event; do
		resolvePrerequestTestsScript "./$folder_name" "$event"
	done

	jq -c 'select(.item != null) | .item[]' <<< "$1" | while read item; do
		resolveRequest "$folder_name" "$item"
	done
}

# 解析请求
# $1 文件夹名称
# $2 request json
function resolveRequest() {
	request_name=$(jq -r '.name' <<< "$2" | tr " " "-")

	echo "处理 ./$1/$request_name 文件"

	createIfAbsent 0 "./$1/$request_name"

	jq -c 'select(.event != null) | .event[]' <<< "$2" | while read event; do
		resolvePrerequestTestsScript "./$1/$request_name" "$event"
	done
}

resolveGlobal