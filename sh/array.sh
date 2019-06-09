#!/bin/bash

# 数组复制
# $1 
function arraycopy() {
    error "arraycopy 函数未实现";
    exit 0;
}

# 获取成员在数组中的索引
# $1 int 返回索引值变量名
# $2 数组的名称
# $3 搜索的元素
function arrayindexof() {
    array_index_of_exprtr="\${$2[@]}"
    eval "array_index_of_aryStr=$array_index_of_exprtr";
    arraylength "array_index_of_aryLen" "$2";
    echo $array_index_of_aryStr;

    array_index_of_i=0
    while [[ $array_index_of_i < $array_index_of_aryLen ]]
    do
        array_index_of_exprtr="test \"\${$2[$array_index_of_i]}\" = \"\$3\"";
        eval $array_index_of_exprtr;

        if [[ $? == 0 ]]
        then
            index=$array_index_of_i
            return 0;
        fi

        array_index_of_i=$((array_index_of_i+1));
    done

    index=-1;
    return 0;
}

# 获取数组的长度
# $1 int 返回值变量名
# $2 数组名称
function arraylength() {
    array_length_exprtr="\${#$2[*]}";
    eval "$1=$array_length_exprtr";
    return 0;
}

# 获取数组的字面值
# $1 string 返回值变量名称
# $2 数组变量名称
function arrayliterals() {
    array_literals_result=`eval echo '$'{$2[*]}`;
    array_literals_result="(${array_literals_result})";
    eval "$1=\"$array_literals_result\"";
    return 0;
}

# 获取数组的长度
# $1 int 返回值变量名
# $2 数组字面值
function arrayliteralslength() {
    eval "array_literals_length_ary=$2";
    eval "$1=${#array_literals_length_ary[*]}";
    return 0;
}

# 向数组中追加入元素
# $1 数组变量名称
# $n (n>1) 要加入的元素
function arraypush() {
    arraylength "array_push_aryLen" $1;
    array_push_args=($@);
    arrayshift "array_push_args";
    arraylength "array_push_argsLen" "array_push_args";

    array_push_i=0;
    while [[ $array_push_i < $array_push_argsLen ]]
    do
        array_push_insert_i=$(($array_push_aryLen+$array_push_i));
        array_push_expr="$1[\$array_push_insert_i]=\${array_push_args[\$array_push_i]}";
        eval $array_push_expr;
        array_push_i=$(($array_push_i+1));
    done

    return 0;
}

# 移除数组第一个元素
# $1 数组的名称
function arrayshift() {
    arraylength "array_shift_aryLen" $1;
    array_shift_aryLen=$((array_shift_aryLen-1));
    array_shift_i=0;
    while [[ $array_shift_i < $array_shift_aryLen ]]
    do
        array_shift_ii=$((array_shift_i+1));
        array_shift_expr="$1[\$array_shift_i]=\${$1[\$array_shift_ii]}";
        eval $array_shift_expr;
        array_shift_i=$array_shift_ii;
    done
    array_shift_expr="$1[$array_shift_i]";

    # 清除变量
    array_shift_unset=(
        "array_shift_aryLen"
        "array_shift_i"
        "array_shift_ii"
        $array_shift_expr
        "array_shift_expr"
        "array_shift_unset"
    );
    unsetvar "array_shift_unset"
    return 0;
}