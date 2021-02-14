import { createAction, handleActions } from "redux-actions";

//액션 타입 정의
const CHANGE_INPUT = "todolist/CHANGE_INPUT";
const CREATE = "todolist/CREATE";
const ENTER = "todolist/ENTER";
const REMOVE = "todolsit/REMOVE";

//액션 함수 정의
let id = 1;
export const changeInput = createAction(CHANGE_INPUT, (text) => text);
export const create = createAction(CREATE, (text) => ({ text, id: id++ }));
export const enter = createAction(ENTER, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

//초기화
const initialState = {
  input: "",
  list: [
    {
      id: 0,
      name: "리덕스 공부하기",
      entered: false,
    },
  ],
};

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
      }),
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map((item) =>
        item.id === action.payload ? { ...item, entered: !item.entered } : item
      ),
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      list: state.list.filter((item) => item.id !== action.payload),
    }),
  },
  initialState
);
