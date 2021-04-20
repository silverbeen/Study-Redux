# Study-Redux





## 사용하는 이유 



### state 종속성 탈출

지금은 useState 를 사용 할 경우 컴포넌트 내부에  state 를 만들고, 함수로 state를 바꿈

```react
const [ test, setTest] = useState("");

const test = () => {
	setTest(1);
}
```

= state 는 컴포넌트에 종속되는 것 



redux 는 종속되지 않고 컴포넌트 바깥에서 상태관리 !



### props -> props -> props  지옥 탈축



## 기본원리

`flux 패턴` : Action -> Dispatch -> Store -> View

데이터 흐름은 동일하게 단방향으로 view(컴포넌트) 에서 Dispatch함수를 통해 action 이 발동 





## reducer 정의

- store에 들어갈 state 와 state 를 바꿀 함수를 정의하는 곳
- 기본적으로 순수함수로 코딩하고, 불변성을 지켜야 함



#### 중요 !! **불변성을 지켜야하는 이유**

- 