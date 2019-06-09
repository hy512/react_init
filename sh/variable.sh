#!/bin/bash

# 释放变量
# $1 保存变量名称的数组的名称
function unsetvar() {
    unset_var_expr="\${$1[@]}";
    eval "unset_var_vars=$unset_var_expr";

    for unset_var_var in $unset_var_vars
    do
        unset -v $unset_var_var;
    done

    unset -v unset_var_vars;
    unset -v unset_var_expr;
    unset -v unset_var_var;
    return 0;
}