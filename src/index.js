import React from 'react';
import ReactDom from 'react-dom';

class Dom extends React.Component {
  render() {
    return (
      <div>
        this is a react app
        <button onClick={() => alert('Hello')}> click me </button>
      </div>
    );
  }
}

ReactDom.render(<Dom />, document.getElementById('root'));
