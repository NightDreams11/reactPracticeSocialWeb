import './index.css';
import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SamuraiJSApp from './App';


// setInterval(() => {
//     store.dispatch({ type: "FAKE" })
// }, 1000)

ReactDOM.render(
    <SamuraiJSApp />, document.getElementById('root')
);




// store.subscribe(() => {
//     let state = store.getState()
//     rerenderEntireThree(state);
// });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
