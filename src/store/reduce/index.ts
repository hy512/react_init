import { combineReducers } from 'redux'
import { helloReduce, HelloStateType } from './HelloReduce';

interface StateType {
    hello: HelloStateType
}

export {
    StateType
}

export const rootRecude = combineReducers({ hello: helloReduce});