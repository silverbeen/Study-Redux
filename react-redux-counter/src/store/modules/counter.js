// 액션 타입 정의
const INCREMENT = 'counter/INCREMENT' ;
const DECREMENT = 'counter/DECREMENT' ;

// 액션 생성 함수 정의
export const increment = () => ({ type: INCREMENT }) ;
export const decrement = () => ({ type: DECREMENT }) ;

// 초기 상태 정의
const initialState = {
    number: 0
} ;

//리듀서는 파라미터를 두개 받음
//첫번째 파라미터는 현재상태
//두번쨰 파라미터는 액션 객체

// 리듀서 작성
export default function Counter(state=initialState, action) {
    switch(action.type) {
        case INCREMENT:
            return {
                ...state,
                number: state.number + 5 ,
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