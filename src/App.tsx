import * as React from 'react'
import { Router } from './router/index'
import { Provider } from 'react-redux'

import './style/app.css'
import { store } from './store';

function App() {
    return (
        <div styleName="app">
            <Provider store={store}>
                <Router />
            </Provider>
        </div>
    );
}

export {
    App
}