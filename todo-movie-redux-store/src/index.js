import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import combineReducers from './reducers/reducer'
// if no file name given than it will import index.js from the folder
import middleware from './middlewares'
import { Provider } from 'react-redux'

//As a second argument of createStore function we will pass Redux.applyMiddleware function
// and we will pass our new middlewareChecker function to this Redux.applyMiddleware function 
const store = createStore(combineReducers, middleware)

ReactDOM.render(
    //this provider component will wrap aur root component which is App
    //By wrapping App this store will be accessable to this whole application
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
