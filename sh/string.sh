#!/bin/bash

# 获取字符串的长度
# $1 int 返回值变量名
# $2 字符串
function stringlength() {
    # 设置返回值
    eval "$1=${#2}";
    return 0;
}

# 用来替换指定的文本
# $1 操作的字符串变量名
# $2 要替换的值
# $3 替换后的值
function strreplace() {
    sr_str=`eval echo '$'$1`;

    # 操作字符串的长度
    sr_strlen=${#sr_str};
    # 要替换的字符串的长度
    sr_targetlen=${#2};
    # 返回值
    sr_result="";

    sr_i=0;
    while [[ $sr_i < $sr_strlen ]]
    do
        # continue;
        if [ "${sr_str:$sr_i:$sr_targetlen}" = "$2" ]
        then
            sr_result="${sr_result}${3}";
            sr_i=$(($sr_i+$sr_targetlen));
        else
            sr_result="${sr_result}${sr_str:$sr_i:1}";
            sr_i=$(($sr_i+1));
        fi
    done
    
    # 设置返回值
    eval "$1=$sr_result";
    return 0;
}

# 切割字符串为数组
# $1 返回值变量的名称
# $2 操作的字符串
# $3 可选的分隔符, 指定字符串的切割字符, 如果没有或不合适, 默认为空白
function stringsplit() {
    error "stringsplit 函数未实现";
    exit 0;
    $string_split_str=$2
    $string_split_separator=$3

    # if [[ $# >= 3 && ${#3} != 1 ]]
    # then
    #     $string_split_separator=$3
    # fi
    # for $string_split_i in "a b c"

}

# 将字符串逐位转换到数组
# $1 返回值变量名称
# $2 转换的字符串
function stringtoarray() {
    stringlength "string_to_array_strlen" $2;
    string_to_array_result=();
    string_to_array_i=0;
    while [[ $string_to_array_i < $string_to_array_strlen ]]
    do
        string_to_array_result[$string_to_array_i]=${2:$string_to_array_i:1};
        string_to_array_i=$((string_to_array_i+1));
    done
    eval "$1=(${string_to_array_result[*]})";
}




function strreplace_test() {
    str="111111";
    # strreplace 操作的字符串 替换的值 新的值
    strreplace "str" "1" "a"
    echo "$str"
    strreplace "str" "aaa" "b"
    echo "$str"
    strreplace "str" "b" "abc"
    echo "$str"
    strreplace "str" "bca" "xyz"
    echo "$str"
    echo "$sr_i"
}