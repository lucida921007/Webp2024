import React from 'react';
import './App.css';
import MyDatePickers from './myDatePickers.js';

function App() {
  return (
    <div className="App">
      <header>
        {MyDatePickers()}
      </header>
    </div>
  );
}

export default App;
