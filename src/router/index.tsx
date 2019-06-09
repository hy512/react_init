import * as React from 'react'
import { Switch } from 'react-router'
import { HashRouter, Route, Redirect } from 'react-router-dom'

import { HelloPage } from '@/page/hello/HelloPage';



const route = {
    hello: {
        index: "/hello"
    }
}


function Router() {
    return (
        <HashRouter>
            <Switch>
                <Route path={route.hello.index} component={HelloPage} />
                <Redirect to={route.hello.index} />
            </Switch>
        </HashRouter>
    )
}

export {
    Router,
    route
}