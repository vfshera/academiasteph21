import React, { Component } from "react";
import ReactDOM from "react-dom";
import store from "./app/store/index";
import { Provider } from "react-redux";

import Main from "./Main";

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById("app")
);
