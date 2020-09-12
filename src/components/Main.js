import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppBar, Home, Chart } from "./index";

export default class Main extends Component {
    render() {
        return (
            <div>
                <AppBar />
                <Switch>
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/chart" render={() => <Chart />} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}
