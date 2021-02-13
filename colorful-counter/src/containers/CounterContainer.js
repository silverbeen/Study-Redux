import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Counter from '../components/Counter';
import { increment, decrement } from '../store/modules/counter';

class CounterContainer extends Component {
  handleIncrement = () => {
    this.props.increment();
  };

  handleDecrement = () => {
    this.props.decrement();
  };

  render() {
    const { color, number } = this.props;
    return (
      <Counter
        color={color}
        value={number}
        onIncrement={this.handleIncrement}
        onDecrement={this.handleDecrement}
      />
    );
  }
}

const mapStateToProps = ({ counter }) => ({
  color: counter.color,
  number: counter.number,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

/* const mapDispatchToProps = dispatch => 
bindActionCreators({increment, decrement}, dispatch); //  bindActionCreators 사용. 대체 가능 */

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
