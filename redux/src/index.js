import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import reducer from "./_reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWidthMiddleware(
        reducer,
        //
        //개발자 도구를 사용하기 위한 설정
        window.__REDUX_DEVTOOLS_EXTENSTION__ &&
          window.__REDUX_DEVTOOLS_EXTENSTION__()
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
