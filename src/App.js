import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        this is a react app
        <button onClick={() => alert('Hello')}> click me </button>
      </div>
    );
  }
}

export default App;
