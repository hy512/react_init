#!/bin/bash

# $1 结果变量名
# $2 参数字符串
function BKDRhash() {
    # the magic number, 31, 131, 1313, 13131, etc.. orz..
    BKDRhash_seed=131;
    BKDRhash_hash=0;
}

:<<EOF
/*
 * BKDR string hash function. Based on the works of Kernighan, Dennis and Pike.
 *
 * Copyleft(or right) 2011         fairywell
*/
unsigned int bkdr_hash(const char *str)
{
    unsigned int seed = 131; // the magic number, 31, 131, 1313, 13131, etc.. orz..
    unsigned int hash = 0;

    unsigned char *p = (unsigned char *) str;
    while (*p)
        hash = hash*seed + (*p++);
    return hash % NHASH;
}


其中 NHASH 为 hash 表的长度。
EOF