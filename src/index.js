import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Function keyword creates special 'this' object & 
// Arrow function does not have 'this', 
// doesn't do special binding with this keyword, has a local scope only
// function createObject() {
//   console.log('outermost this', this) 
//   // returns undefined - hasn't been set to anything else in global scope

//   return {
//     arrowFunction: () => { console.log('arrowFunction this', this) },
//     functionKeywordFunction: function() { console.log('functionKeyword this', this) }
//   }
// }

// const obj = createObject();
// console.log('obj', obj)

// obj.arrowFunction();
// // arrow function returns undefined from global scope,
// // it doesn't set 'this' to the owner object 

// obj.functionKeywordFunction();
// //  function keyword set 'this' to the owner object