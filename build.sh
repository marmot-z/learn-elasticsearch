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
		resolveFloder "." "$item"
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
# $1 父级文件夹所在路径
# $2 floder json
function resolveFloder() {
	if [ -z "$2" -o "$2" = " " ]; then
		return
	fi

	folder_name=$(jq -r '.name' <<< "$2" | tr " " "-")
	full_path="$1/$folder_name"

	echo "处理 $full_path 文件夹"

	createIfAbsent 0 "$full_path"

	jq -c 'select(.event != null) | .event[]' <<< "$2" | while read -r event; do
		resolvePrerequestTestsScript "$full_path" "$event"
	done

	jq -c 'select(.item != null) | .item[]' <<< "$2" | while read -r item; do
		# 解析请求
		resolveRequest "$full_path" "$item"

		# 如果有子文件夹则递归解析文件夹
		has_child_folder=$(jq 'has("item")' <<< "$item")

		if [ "$has_child_folder" = true ]; then
			child_folder_name=$(jq -r '.name' <<< "$item" | tr " " "-")

			jq -c '.item[]' <<< "$item" | while read -r sub_item; do
				resolveFloder "$full_path/$child_folder_name" "$sub_item"
			done
		fi
	done

	description=$(jq -r 'select(.description != null) | .description' <<< "$2")
	default_title=$(jq -r '.name' <<< "$2")

	resolveDescription "$full_path" "$description" "$default_title"
}

# 解析请求
# $1 floder name
# $2 request json
function resolveRequest() {
	if [ -z "$2" -o "$2" = " " ]; then
		return
	fi

	request_name=$(jq -r '.name' <<< "$2" | tr " " "-")

	echo "处理 $1/$request_name 文件夹"

	createIfAbsent 0 "$1/$request_name"

	jq -c 'select(.event != null) | .event[]' <<< "$2" | while read -r event; do
		resolvePrerequestTestsScript "$1/$request_name" "$event"
	done

	description=$(jq -r 'select(.request.description != null) | .request.description' <<< "$2")
	default_title=$(jq -r '.name' <<< "$2")

	resolveDescription "$1/$request_name" "$description" "$default_title"
}

resolveGlobal learn-elasticsearch.postman_collection.json
