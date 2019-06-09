import { createStore, applyMiddleware, Action, Store } from 'redux'
import thunk from 'redux-thunk'
import { StateType, rootRecude } from './reduce'


const store: Store<StateType, Action<string>> =
    createStore<StateType, Action<string>, {}, {}>
        (rootRecude, applyMiddleware(thunk));

export {
    store
}
