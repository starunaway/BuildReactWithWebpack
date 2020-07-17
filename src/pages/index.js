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

  render() {
    const {year, day, clickTimes, color} = this.props;
    return (
      <div>
        <ul>
          <li key='year' style={{color: year.color}}>
            <span>{year.year}</span>
            <button onclick={() => Action.emit('count.year', {year: year.year++})}> 改变year </button>
            <button onclick={() => Action.emit('count.year', {color: year.color === 'red' ? 'green' : 'red'})}>
              改变year颜色
            </button>
          </li>

          <li key='day' style={{color: day.color}}>
            <span>{day.day}</span>
            <button onclick={() => Action.emit('count.day', {day: day.day++})}> 改变day </button>
            <button onclick={() => Action.emit('count.day', {color: day.color === 'blue' ? 'yellow' : 'blue'})}>
              改变day颜色
            </button>
          </li>

          <li key='color' style={{color: color}}>
            <span>{clickTimes}</span>
            <button
              onclick={() => {
                Action.emit('count.times.click', clickTimes++);
                Action.emit('color', `f5f5${10 + clickTimes}`);
              }}
            >
              加加加
            </button>
            <button onclick={() => Action.emit('color', `f5f5${10 + clickTimes}`)}>变变变</button>
          </li>
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    year: state.count.year,
    day: state.count.day,
    clickTimes: state.count.times.click,
    color: state.color,
  };
}

export default connect(mapStateToProps)(App);
