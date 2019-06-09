#!/bin/bash

# 判断是不是一个整数
# $1 数据
# return true | false
function isinteger() {
    if test ${#1} -ne 0
    then
        if test `expr match $1 [0123456789]*` -eq ${#1}
        then
            return 0;
        fi
    fi
    return 1;
}