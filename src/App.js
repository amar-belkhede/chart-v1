import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";

class App extends Component {
    // const Home = () => {
    //     return <Home />;
    // };
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Main />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
