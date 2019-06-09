import { handleActions, Action } from 'redux-actions'
import { HELLO_LOAD } from '../action/HelloAction';

type DataStateType = "start" | "progress" | "end" | "error";

export interface HelloStateType {
    state: DataStateType,
    data: string,
    error: Error;
}

export interface HelloPayloadType {
    state: DataStateType,
    data?: string,
    error?: Error;
}

export const helloReduce = handleActions<HelloStateType, HelloPayloadType>({
    [HELLO_LOAD]: (state: HelloStateType, action: Action<HelloPayloadType>) => Object.assign({}, state, action.payload),
}, {
        state: "end",
        data: "none",
        error: null
    });