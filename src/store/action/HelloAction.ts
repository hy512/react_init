import { Dispatch } from "redux";
import { StateType } from "../reduce";
import { Action } from "redux-actions";
import { HelloPayloadType } from "../reduce/HelloReduce";
import { HelloService } from "@/service/HelloService";


export const HELLO_LOAD = "LOAD THE HELLO.";


export function loadHello() {
    return function (dispatch: Dispatch<Action<HelloPayloadType>>, getState: () => StateType) {
        dispatch({ type: HELLO_LOAD, payload: { state: "progress", data: "loading hello." } });
        return new HelloService().loadHello()
            .then(r => dispatch({ type: HELLO_LOAD, payload: { state: "end", data: r } }))
            .catch(e => dispatch({ type: HELLO_LOAD, payload: { state: "error", error: e } }));
    }
}