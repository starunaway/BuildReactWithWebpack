import React, {Component} from 'react';
import {connect} from './lib/react-redux';

import {increment, decrement, asyncIncrement} from './redux/actions.js';

class App extends Component {
  handleIncrement = () => {
    this.props.increment(1);
  };
  handleDecrement = () => {
    this.props.decrement(1);
  };

  handleAsyncIncrement = () => {
    this.props.asyncIncrement(1);

    // setTimeout(() => {
    //   this.props.increment(1);
    // }, 2000);
  };

  render() {
    const count = this.props.count;
    return (
      <div>
        <span>value is: {count}</span>
        <button onClick={this.handleIncrement}> +1 </button>
        <button onClick={this.handleDecrement}> -1 </button>
        <button onClick={this.handleAsyncIncrement}> +1 after 2s </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({count: state.count});
const mapDispatchToProps = {increment, decrement, asyncIncrement};

export default connect(mapStateToProps, mapDispatchToProps)(App);
