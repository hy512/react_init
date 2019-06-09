#!/bin/bash

# color echo
function cecho() {
    text=$1
    tx=$2
    bg=$3

    case $tx in
    "red")
        tx="31"
        ;;
    "yellow")
        tx="33"
        ;;
    "blue")
        tx="34"
        ;;
    "cerulean")
        tx="36"
        ;;
    *)
        tx="37"
    esac

    case $bg in
    "red")
        bg="37"
        ;;
    *)
        bg="40"
    esac

    echo -e "\033[${bg};${tx}m${text}\033[0m"
}

function error() {
    cecho "ERROR: $1" "red"
}

function info() {
    cecho "INFO: $1" "cerulean"
}

function warn() {
    cecho "WARN: $1" "yellow"
}