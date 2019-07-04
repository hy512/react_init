#!/bin/bash

dependencies=""
devDependencies=""

shellDir=`cd $(dirname $0); pwd`;
baseDir=`pwd`;
projectDir="";

args=($@)

source "${shellDir}/sh/bootstrap.sh"

function setting() {
    i=0
    while [[ $i < ${#args[@]} ]]
    do
        case ${args[$i]} in
        "--p")
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
            ;;
        *)
            if test -z "$projectDir"
            then
                projectDir="${baseDir}/${args[$i]}";
            else
                error "无效参数: ${args[$i]}";
                exit 1;
            fi
        esac

        i=`expr $i + 1`;
    done
    unset i

    if [ "$projectDir" = "" ]
    then
        projectDir=$baseDir
        warn "未指定项目路径";
    fi

    info "项目路径: ${projectDir}";
    read -p "是否确定? (y/n):" confirm;

    if test "$confirm" = "n"
    then
        info "取消操作";
        exit 0;
    fi

    return 0
}

# 建立项目
function tryBuildProject() {
    if test ! -e $projectDir
    then
        info "创建路径： ${projectDir}";
        mkdir -p $projectDir
        if test $? -ne 0
        then
            error "创建项目失败";
        fi
    fi

    cd ${projectDir}
    if [ ! -e "${projectDir}/package.json" ]
    then
        npm init -y
    fi
    cd -
    return 0
}

# 安装 libs
function installDependencies() {
    cd ${projectDir}

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
    devDependencies="${devDependencies} uglifyjs-webpack-plugin html-webpack-plugin"
    
    # loader
    devDependencies="${devDependencies} babel-loader css-loader file-loader postcss-loader style-loader ts-loader"
    
    # typescript
    devDependencies="${devDependencies} tslint typescript"
    devDependencies="${devDependencies} @types/jquery"
    
    # babel
    dependencies="${dependencies} babel-polyfill @babel/runtime"
    devDependencies="${devDependencies} @babel/core @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react"
    
    # babel-plugins
    devDependencies="${devDependencies} babel-plugin-module-resolver babel-plugin-react-css-modules @types/react-css-modules"
    
    # postcss
    devDependencies="${devDependencies} autoprefixer cssnano"
    
    info "安装依赖: ${devDependencies}"
    npm install --save-dev ${devDependencies}

    info "安装依赖: ${dependencies}"
    npm install ${dependencies}

    cd -
    return 0
}

function copyResource() {
    info "复制资源文件"
    resources=(
        "build"
        "src"
        ".babelrc"
        ".postcssrc.json"
        "index.html"
        "jsconfig.json"
        "tsconfig.json"
        "tslint.json"
        "webpack.config.js"
    )

    i=0
    while test $i -lt ${#resources[@]} 
    do
        resources[$i]="${shellDir}/${resources[$i]}"
        i=`expr $i + 1`
    done
    unset i

    cp -rv ${resources[@]} -t ${projectDir}/
    return 0
}

function addNpmScript() {
    cd ${projectDir}
    info "添加 NPM 脚本"
    sed -ri "/\"scripts\":\s*/ r ${shellDir}/package.json.scripts.txt" package.json
    cd -
    return 0
}

function main() {
    setting
    tryBuildProject
    installDependencies
    addNpmScript
    copyResource
    info "success"
    return 0
}

main

exit 0