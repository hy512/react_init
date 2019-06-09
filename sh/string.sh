#!/bin/bash

# 获取成员在数组中的索引
# $1 int 返回索引值变量名
# $2 操作的字符串
# $3 搜索的子串
function stringindexof() {
    string_index_of_strLen=${#2};
    string_index_of_i=0;
    string_index_of_targetLen=${#3};
    eval "$1=-1";
    while test $string_index_of_i -lt $string_index_of_strLen
    do
        if test "${2:string_index_of_i:string_index_of_targetLen}" = "$3"
        then
            eval "$1=$string_index_of_i";
            break 1;
        fi
        string_index_of_i=`expr $string_index_of_i + 1`;
    done

    # 清理变量
    string_index_of_vars=(
        "string_index_of_strLen"
        "string_index_of_targetLen"
        "string_index_of_i"
        "string_index_of_vars"
    );
    unsetvar "string_index_of_vars";
    return 0;
}

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
    string_split_str=$2;
    string_split_separator=($3);

    # 设置缺省参数
    if [[ $# < 3 ]]
    then
        string_split_separator=("\r\n" "\n" "\r" " " "\v" "\f" "\t");
    elif [[ ${#3} == 0 ]]
    then
        stringtoarray $1 $2;
        return 0;
        # 对空格特殊处理
    elif test "$3" = " "
    then
        string_split_separator[0]="$3";
    fi

    eval "$1=()";

    while true
    do
        string_split_point=-1;
        # 寻找第一个分隔符位置
        string_split_i=0;
        while test $string_split_i -lt ${#string_split_separator[*]}
        do
            string_split_sp=${string_split_separator[$string_split_i]};
            stringindexof "string_split_newPoint" "$string_split_str" "$string_split_sp";

            # info "$string_split_newPoint \"$string_split_str\" \"$string_split_sp\""

            if test $string_split_newPoint -ge 0
            then
                # test 参数限制, or 条件分两次写了.
                if test ! `isinteger "string_split_point"`
                then
                    string_split_point=$string_split_newPoint;
                elif test $string_split_point -lt 0 -o $string_split_newPoint -lt $string_split_point
                then 
                    string_split_point=$string_split_newPoint;
                fi
            fi

            string_split_i=`expr $string_split_i + 1`;
        done

        # error $string_split_point
        # 找到分隔符元素
        if test $string_split_point -ge 0
        then
            string_split_partLen=`expr $string_split_point + ${#string_split_sp}`;
            string_split_expr="$1[\${#$1[*]}]=\"${string_split_str:0:$string_split_point}\"";
            eval $string_split_expr;
            # info $string_split_expr
            # arraypush "$1" "${string_split_str:0:$string_split_point}";
            string_split_str="${string_split_str:$string_split_partLen}";
            # info "$string_split_str"
            if test ${#string_split_str} -eq 0
            then
                # info "设置空字符串"
                string_split_expr="$1[\${#$1[*]}]=\"$string_split_str\"";
                eval $string_split_expr;
                # info $string_split_expr
                # 因为空 string 无法当作参数传递
                # arraypush "$1" "$string_split_str";
                break 1;
            fi
        else
            break 1;
        fi
    done

    if test ${#string_split_str} -gt 0
    then
        # arraypush "$1" "$string_split_str";
        string_split_expr="$1[\${#$1[*]}]=\"$string_split_str\"";
        eval $string_split_expr;
    fi

    # 变量清理
    string_split_vars=(
        "string_split_str"
        "string_split_separator"
        "string_split_sp"
        "string_split_i"
        "string_split_point"
        "string_split_newPoint"
        "string_split_partLen"
        "string_split_expr"
        "string_split_vars"
    );
    unsetvar "string_split_vars";
    return 0;
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