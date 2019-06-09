#!/bin/bash

dependencies=""
devDependencies=""

shellDir=`cd $(dirname $0); pwd`;
baseDir=`pwd`;
projectDir=`pwd`;

args=($@)

source "${shellDir}/sh/bootstrap.sh"

var=("a" "b" "c" "d" "哈哈哈")
arrayindexof "index" "var" "c";
echo $index;

arrayindexof "index" "var" "d";
echo $index;

arrayindexof "index" "var" "f";
echo $index;

arrayindexof "index" "var" "a";
echo $index;

arrayindexof "index" "var" "bc";
echo $index;

arrayindexof "index" "var" "cde";
echo $index;

arrayindexof "index" "var" "哈哈哈";
echo $index;


exit 0;

function setting() {
    i=0
    while [[ $i < ${#args[@]} ]]
    do
        case ${args[$i]} in
        "--dir")
            # 检查项目创建目录
            dir=${args[$((i+1))]}

            # 相对路径转换
            if [ "${dir:0}" != "/" ]
            then
                dir="${baseDir}/${dir}"
            fi

            # 去除最后一级路径分隔符 /
            lastCharIndex=${#string}
            lastCharIndex=$((lastCharIndex-1))
            if [ "${dir:$lastCharIndex}" = "/" ]
            then
                dir=${dir:0:$lastCharIndex}
            fi

            # 检查目录是否存在
            if [ ! -d $dir ]
            then
                error "'${dir}' 目录不存在"
                exit 1
            fi

            projectDir=$dir
            i=$((i+2))
            continue
        esac
    done
    unset i

    if [ "$projectDir" = "" ]
    then
        projectDir=$baseDir
    fi

    return 0
}

# 建立项目
function tryBuildProject() {
    if [ ! -e "${projectDir}/package.json" ]
    then
        echo 'npm init -y'
    fi
    return 0
}

# 安装 libs
function installDependencies() {
    cd $projectDir

    # react
    devDependencies="${devDependencies} @types/react @types/react-dom"
    dependencies="${dependencies} react react-dom"
    
    # react-router
    dependencies="${dependencies} react-router react-router-dom"
    devDependencies="${devDependencies} @types/react-router @types/react-router-dom"
    
    # redux
    dependencies="${dependencies} redux react-redux"
    devDependencies="${devDependencies} @types/react-redux"
    
    # redux-actions
    dependencies="${dependencies} redux-actions"
    devDependencies="${devDependencies} @types/redux-actions"
    
    # redux-thunk
    dependencies="${dependencies} redux-thunk"
    
    # tween
    dependencies="${dependencies} @tweenjs/tween.js"
    devDependencies="${devDependencies} @types/tween.js"
    
    # hammerjs
    dependencies="${dependencies} hammerjs"
    devDependencies="${devDependencies} @types/hammerjs"
    
    # webpack
    devDependencies="${devDependencies} webpack webpack-cli webpack-merge webpack-dev-server"
    
    # webpack-plugins
    devDependencies="${devDependencies} uglifyjs-webpack-plugin"
    
    # loader
    devDependencies="${devDependencies} babel-loader css-loader file-loader postcss-loader style-loader ts-loader"
    
    # typescript
    devDependencies="${devDependencies} tslint typescript"
    
    # babel
    dependencies="${devDependencies} babel-polyfill @babel/runtime"
    devDependencies="${devDependencies} @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react"
    
    # babel-plugins
    devDependencies="${devDependencies} babel-plugin-module-resolver babel-plugin-react-css-modules @types/react-css-modules"
    
    # postcss
    devDependencies="${devDependencies} autoprefixer cssnano"
    
    echo "npm install --save-dev ${devDependencies}"
    echo "npm install ${dependencies}"

    cd -
    return 0
}

function copyResource() {
    echo 'cp -rv "${baseDir}/init/*" "${projectDir}/"'
    return 0
}

function addNpmScript() {
    return 0
}

function main() {

    setting

    info "项目路径为 $projectDir"

    tryBuildProject

    installDependencies

    addNpmScript

    copyResource

    return 0
}

main

exit 0