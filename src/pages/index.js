import React from 'react';
import {connect} from 'react-redux';
import Action from '@action';

class App extends React.Component {
  componentDidMount() {
    Action.emit('user', {
      usernames: '',
      password: '',
    });
  }

  handleClick = () => {
    Action.emit('increment', {value: 1});
  };

  render() {
    return (
      <div>
        <span>count: {this.props.count}</span>
        <button onClick={this.handleClick}> +1 </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
