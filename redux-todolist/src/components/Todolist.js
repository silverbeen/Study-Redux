import React from "react";
import "./Todolist.css";

const TodolistItem = ({ text, entered, onEnter, onRemove }) => {
  return (
    <li>
      <div className={`text ${entered ? "entered" : ""}`}>{text}</div>
      <div className="buttons">
        <button onClick={onEnter}>완료</button>
        <button onClick={onRemove}>삭제</button>
      </div>
    </li>
  );
};

const TodoList = ({
  input,
  onChange,
  onSubmit,
  onRemove,
  onEnter,
  todolist,
}) => {
  const todolistItems = todolist.map((t) => (
    <TodolistItem
      key={t.id}
      text={t.name}
      id={t.id}
      onEnter={() => onEnter(t.id)}
      onRemove={() => onRemove(t.id)}
    />
  ));

  return (
    <div className="WaitingList">
      <h2>todolist</h2>
      {/* form 과 input 에 이벤트 및 값 설정 */}
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button>등록</button>
      </form>
      <ul>{todolistItems}</ul> {/* 하드코딩된것을 컴포넌트 배열로 교체 */}
    </div>
  );
};

export default TodoList;
