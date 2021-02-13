# React + Redux로 Counter 만들기



# 0.배경

```
+ 버튼을 클릭하면 Counter 증가
- 버튼을 클릭하면 Counter 감소
```





# 1. 설치

프로젝트 설치

```
npm create-react-app counter
```



react-redux-counter 디렉토리에 들어가 필요한 모듈을 설치

```
npm install --save  redux react-redux
```





# 2. 입력받을 화면 만들기





#### /src/components/Counter.js 를 생성

```react
import React from 'react' ;
const Counter = () => {
  return (
    <div>
      <h1>myCounter</h1> // 카운터를 표시해줄 부분
      <button>+</button> // 증감 버튼
      <button>-</button> // 감소 버튼
    </div>
  ) ;
} ;

export default Counter ;
```



#### src/App.js

```react
import React, { Component } from 'react';

import './App.css';
import Counter from './components/Counter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter  />
      </div>
    );
  }
}

export default App;
```





# 3. 액션

- 액션 : 상태 변화를 일으킬 때 참조하는 객체

```
* Store에 대해 뭔가 하고싶은 경우에 Action 을 발행한다.
* Store에 리듀서가 Action 을 감지하면 새로운  State 가 생긴다
```





#### /src/store/modules/counter.js

```react
// 액션 타입 정의
const INCREMENT = 'counter/INCREMENT' ;
const DECREMENT = 'counter/DECREMENT' ;

// 액션 생성 함수 정의
export const increment = () => ({ type: INCREMENT }) ;
export const decreuemt = () => ({ type: DECREMENT }) ;

// 초기 상태 정의
const initialState = {
    number: 0
} ;
```





# 4. 리듀서 작성



- 리듀서는 상태에 변화를 일으키는 함수이다. 파라미터 두개를 받는다.
- 첫번째 파라미터는 현재 상태
- 두번째 파라미터는 액션 객체



#### /src/store/modules/counter.js

```react
// 리듀서 작성
export default function Counter(state=initialState, action) {
    switch(action.type) {
        case INCREMENT:
            return {
                ...state,
                number: state.number + 1 ,
            } ;
        case DECREMENT:
            return {
                ...state,
                number: state.number - 1,
            } ;
        default:
            return state ;
    }
}
```





# 5. 리듀서 합치기

redux 의 내장함수인 combineReducers 을 사용하여 리듀서를 하나로 합치는 작업



#### src/store/modules/index.js

```react
import { combineReducers } from 'redux' ;
import counter from './counter' ;

export default combineReducers({
    counter,
    //다른 리듀서를 만들게 되면 여기에 import
}) ;
```





# 6. 스토어 만들기

스토어에는 하나의 애플리케이션 하나의 스토어가 존재



#### src/index.js

```react
import React from 'react';
import ReactDOM from 'react-dom';
// createStore 와 루트 리듀서 불러오기
import { createStore } from 'redux';
import rootReducer from './store/modules';
import { Provider } from 'react-redux' ;

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// **** 리덕스 개발자 도구 적용
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
```



정리 : 화면(Counter.js) 에서 +,- 버튼으르 클릭하게 되면 액션을 통해 리듀서(counter.js) 를 거치고 스토어 상태를 변화한 후 다시 view 에 변화를 주어야 함

```
우리가 한 일은
1. 화면생성 (Counter.js)
2. 액션생성 (counter.js)
3. 리듀서 생성(counter.js)
4. 스토어 생성(index.js)
```



#### 해야되는 일

```
1. 액션을 스토어에 전달하는 역할인 dispatch 생성 (mapDispatchToProps)
2. store에 state를 view에 전달해주기 (mapStateToProps)
3. store와 reducer를 연결시킬 수 있도록 만들어진 Component 생성 (CounterContainter.js)
4. 위의 두가지가 적용된 props를 받을 수 있는 component를 정의 (App.js)
```



# 7. 1,2,3  생성

#### src/container/CounterContainer.js

컴포넌트에 리덕스 스토어 안에있는 값이나 액션 함수들을 연결해주어야 한다

리덕스와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부른다



```react
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

class CounterContainer extends Component { //3
    handleIncrement = () => {
        this.props.increment() ;
    } ;

    handleDecrement = () => {
        this.props.decrement () ;
    } ;

    render() {
        const { number } = this.props ;
        return (
            <Counter 
                value={number}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
            />
        ) ;
    } 
}


const mapStateToProps = ({ counter }) => ({  //2
    number: counter.number,
}) ;

const mapDispatchToProps = {increment, decrement} ; //1

export default connect ( // 스토어와 연결
    mapStateToProps,
    mapDispatchToProps
)(CounterContainer) ;
```



# 8. Counter.js 수정

이제 스토어에서 변경된 counter(value 값) , 증가, 감소 버튼을 props로  디스패치한것들 받아와야 한다



#### src/containers/Counter.js

```react
import React from 'react' ;

const Counter = ({ value, onIncrement, onDecrement }) => {
  return (
    <div>
      <h1>{value}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
  ) ;
} ;

export default Counter ;
```





# 9. App.js 수정

```react
import React, { Component } from 'react';

import './App.css';
import CounterContainer from './container/CounterContainer.js' ;

class App extends Component {
  render() {
    return (
      <div className="App">
        <CounterContainer  />
      </div>
    );
  }
}

export default App;
```

