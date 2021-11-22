import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import configureAppStore, { getPreloadedState } from "./store/configureStore";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const preloadedState = getPreloadedState();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={configureAppStore(preloadedState)}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
