import 'babel-polyfill'
import './style/init.css'
import './style/common.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App } from './App'

import '@/config/animate'

async function main() {
    // await new Promise((resolve, reject) => {
    //     document.addEventListener(
    //         'deviceready',
    //         () => resolve(),
    //         false
    //     );
    // });
    
    ReactDOM.render(
        React.createElement(App),
        document.getElementById("app")
    );
}

main();