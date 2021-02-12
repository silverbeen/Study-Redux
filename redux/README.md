# react + redux를 활용한 로그인및 회원가입 만들기 - 회원가입만들기



- react 파일 구축

```
npx create-react-app frontend
```



```
npm i react-router-dom redux react-redux redux-promise redux-thunk axios --save
```



- 리덕스 개발자 도구

```
 yarn add redux-devtools-extension
```



```
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const store = createStore(rootReducer, composeWithDevTools()); // 스토어를 만듭니다.
// composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화
```





react-router-dom, redux, react-redux(리덕스를 쉽게 사용할수 있게 도와주는 라이브러리)

redux-promise(리덕스에서 promise 패턴을 사용할수 있게 해주는 라이브러리),

redux-thunk(만약에 특정 액션이 몇초뒤에 실행되게 하거나, 현재 상태에 따라 아예 액션이 무시등 해당 기능을 사용하기 위해 사용)

axios를 사용



- 폴더구조 생성

  - _actions(redux의 action들 모음)

  - _reducers(redux의 reducers모음)

  - _components/views(화면을 그려주는 부분)

  - hoc(auth등 로그인시 접근제어를 위한 컴포넌트 폴더)

  - utils(라이브러리를 모아둔다, axios등)





1. Provider 로 react 감싸기 -> store생성하기(reduxThunk, reduxrnt) -> Provider에 생성한 store 바인딩하기 

```react
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';

const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWidthMiddleware(
        //리듀서를 생성후 넣어준다
        //
        //개발자 도구를 사용하기 위한 설정
        window.__REDUX_DEVTOOLS_EXTENSTION__ && 
        window.__REDUX_DEVTOOLS_EXTENSTION__()
      )}
    ></Provider>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```



2. axios  모듈화

```react
import axios from "axios";

const URL = "http://localhost:9000";

axios.defaults.withCredentials = true; //쿠키 데이터를 전송받기 위해

export const request = (method, url, data) => {
  return axios({
    method,
    url: URL + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

```

- 쿠키데이터를 주고받기 위해 axios.defaults.withCredentials를 true 로 지정해주고
- request 를  export 시켜서 어디서든 import  할 수 있도록 



3. 모든 view들 각각 모듈화



4. types.js 에서는 각각 type 들의 형태를 변수로 관리

   - 회원가입 기능이니 REGISTER_USER 로 정의
   - 이를 바탕으로 action 함수 생성

   

   userAction.js

   ```react
   import { REGISTER_USER } from "./types";
   import { request } from "../utils/axios";
   
   const USER_URL = "/api/user";
   
   export function registerUser(dataToSubmit) {
     const data = request("post", USER_URL + "/register", dataToSubmit);
   
     return {
       type: REGISTER_USER,
       payload: data,
     };
   }
   
   ```

   - 모듈화 된 axios 로 제작된 request 를 사용하여 액션 함수 생성
   - post 요청을 보내고 받은 갑을 payload 에 실어서
   - reducer 에서 해당 타입을 읽을 수 있도록 해야함



​		userReducer.js

  - ```react
    import { REGISTER_USER } from "../_actions/types";
    
    export default function (state = {}, action) {
      switch (action.type) {
        case REGISTER_USER:
          return { ...state, loginSuccess: action.payload };
    		default:
    			return state;
      }
    }
    
    ```

    

    - REGISTER_USER 일때 loginSuccess에서 action 의 payload 값을 받아온다 
    - userAction 의 값을 받아온다고 보면 됨
    - 해당 reducer을 한 곳에서 묶에서 하나의 리듀서처럼 보여지게 하는 작업이 필요!!
    - reducer/index.js 에서 combinReducers 를 사용하여 하나의 리듀서로 만들어줌!!!!!!

    

    reducer/index.js

    ```react
    import { combinReducers } from 'redux';
    import user from './userReducer';
    
    const rootReducer = combinReducers({
      user,
    })
    
    export default rootReducer;
    ```

- reducer 가 생성되었으니 해당 reducer 를 store 에 넣어줘야 함



index.js

```react
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
    ></Provider>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```





해당 기능까지 완료했다면 정상적으로 회원가입 기능 완성





- useDispatch(useDispatch는 redux store에 설정된 action에 대한 dispatch를 연결하는 훅이다.)와 registerUser를 import 해서 

  useDispatch 안에 액션 함수를 넣어준다.

  ```
  
  ```