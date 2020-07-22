import React from 'react';
import {connect} from 'react-redux';
import Action from '@action';

class App extends React.Component {
  //   componentDidMount() {
  //     Action.emit('user', {
  //       usernames: '',
  //       password: '',
  //     });
  //   }

  //   render() {
  //     let {clickTimes} = this.props;
  //     return (
  //       <div>
  //         <span> 点击次数{clickTimes}</span>
  //         <button onClick={() => Action.emit('count.times.click', ++clickTimes)}>click</button>
  //       </div>
  //     );
  //   }

  render() {
    let {year, day, clickTimes, color} = this.props;
    return (
      <div>
        <ul>
          <li key='year' style={{color: year.color}}>
            <span>{year.year}</span>
            <button onClick={() => Action.emit('count.year', {year: year.year + 1})}> 改变year </button>
            <button onClick={() => Action.emit('count.year', {color: year.color === 'red' ? 'green' : 'red'})}>
              改变year颜色
            </button>
          </li>

          <li key='day' style={{color: day.color}}>
            <span>{day.day}</span>
            <button onClick={() => Action.emit('count.day', {day: day.day + 1})}> 改变day </button>
            <button onClick={() => Action.emit('count.day', {color: day.color === 'blue' ? 'pink' : 'blue'})}>
              改变day颜色
            </button>
          </li>

          <li key='color' style={{color: color}}>
            <span>{clickTimes}</span>
            <button
              onClick={() => {
                Action.emit('count.times.click', ++clickTimes);
              }}
            >
              加加加
            </button>
            <button
              onClick={() => Action.emit('color', `#${10 + clickTimes * 10}${10 + clickTimes * 5}${10 + clickTimes}`)}
            >
              变变变
            </button>
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
