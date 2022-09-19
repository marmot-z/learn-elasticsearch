#!/bin/bash
# 解析 postman_collection.json 文件生成对应的文件夹内容
# author: zhangxunwei
# date: 2022-09-18

# 解析全局配置
# $1 postman_collection json
function resolveGlobal() {
	jq -c '.event[]' $1 | while read -r event; do
		resolvePrerequestTestsScript "." "$event"
	done

	jq -c '.item[]' $1 | while read -r item; do
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
			echo "写入 $parent_path/pre-request-script.js"
			echo "$script" > "$parent_path/pre-request-script.js"
		fi
	
	# 如果为 test 创建 test.js 	
	elif [ "$val" = "test" ]; then
		createIfAbsent 1 "$parent_path/tests.js"

		script=$(jq -r '.script | (.exec | join("\n"))' <<< "$event")

		if [ ! -z "$script" -a "$script" != " " ]; then
			echo "写入 $parent_path/tests.js"
			echo "$script" > "$parent_path/tests.js"
		fi
	fi
}

# 解析文档
# $1 文件所在的相对路径
# $2 description
# $3 title
function resolveDescription() {
	parent_path="$1"
	description="$2"

	if [ -z "$description" -o "$description" = " " ]; then
		description="### $3"
	fi

	createIfAbsent 1 "$parent_path/README.md"

	echo "写入 $parent_path/README.md"
	echo "$description" > "$parent_path/README.md"
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
	jq -c 'select(.event != null) | .event[]' <<< "$1" | while read -r event; do
		resolvePrerequestTestsScript "./$folder_name" "$event"
	done

	jq -c 'select(.item != null) | .item[]' <<< "$1" | while read -r item; do
		resolveRequest "$folder_name" "$item"
	done

	description=$(jq -r 'select(.description != null) | .description' <<< "$1")
	default_title=$(jq -r '.name' <<< "$1")

	resolveDescription "./$folder_name" "$description" "$default_title"
}

# 解析请求
# $1 文件夹名称
# $2 request json
function resolveRequest() {
	request_name=$(jq -r '.name' <<< "$2" | tr " " "-")

	echo "处理 ./$1/$request_name 文件夹"

	createIfAbsent 0 "./$1/$request_name"

	jq -c 'select(.event != null) | .event[]' <<< "$2" | while read -r event; do
		resolvePrerequestTestsScript "./$1/$request_name" "$event"
	done

	description=$(jq -r 'select(.request.description != null) | .request.description' <<< "$2")
	default_title=$(jq -r '.name' <<< "$2")

	resolveDescription "./$1/$request_name" "$description" "$default_title"
}

resolveGlobal learn-elasticsearch.postman_collection.json
