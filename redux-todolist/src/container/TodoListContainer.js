import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as todolistActions from "../store/modules/todolist";
import Todolist from "../components/Todolist";

class TodoListContainer extends Component {
  handleChange = (e) => {
    const { todolistActions } = this.props;
    todolistActions.changeInput(e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { todolistActions, input } = this.props;
    todolistActions.create(input);
    todolistActions.changeInput("");
  };

  handleEnter = (id) => {
    const { todolistActions } = this.props;
    todolistActions.enter(id);
    console.log("됐음");
  };

  handleRemove = (id) => {
    const { todolistActions } = this.props;
    todolistActions.remove(id);
  };

  render() {
    const { input, list } = this.props;
    return (
      <Todolist
        input={input}
        todolist={list}
        onChange={this.handleChange}
        onEnter={this.handleEnter}
        onSubmit={this.handleSubmit}
        onRemove={this.handleRemove}
      />
    );
  }
}

const mapStateToProps = ({ todolist }) => ({
  input: todolist.input,
  list: todolist.list,
});

const mapDispatchToProps = (dispatch) => ({
  todolistActions: bindActionCreators(todolistActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
