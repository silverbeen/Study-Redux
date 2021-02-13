import React from "react";
import ReactDOM from "react-dom";
// createStore 와 루트 리듀서 불러오기
import { createStore } from "redux";
import rootReducer from "./store/modules";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import reportWegVitals from "./reportWebVitals";

// **** 리덕스 개발자 도구 적용
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWegVitals();
