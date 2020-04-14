import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import AuthPage from "./pages/AuthPage/AuthPage"
import Page1 from "./pages/Page1/Page1"
import Page2 from "./pages/Page2/Page2"
import Page3 from "./pages/Page3/Page3"

export const useRoutes = isAuthentificated => {
    if (isAuthentificated) {
        return(
            <Switch>
                <Route path="/page1" exact>
                    <Page1 />
                </Route>
                <Route path="/page2" exact>
                    <Page2 />
                </Route>
                <Route path="/page3" exact>
                    <Page3 />
                </Route>
                <Redirect to="/page1" />
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}