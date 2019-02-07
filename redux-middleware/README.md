# redux library used instead of custom created createStore function

This folder contains two files
  1) index.html
  2) index.js
  
Index.html file has basic page with two input text fields. First for Todo Task and 2nd for Movie to watch

Index.js contains all the javascript for redux store, actions, dispatchers, reducers and functionality for adding, toggle and deleting ToDo task and movie to watch from list on the browser's DOM

In this index.js we have used Redux library's Redux.createStore and Redux.combineReducers instead of our custom created createStore and root_reducer function

We have also added Redux middleware functionality in this index.js

Redux official docs describes middleware as

	“provides a third-party extension point between dispatching an action, and the moment it reaches the reducer”

Middleware could be use for logging, crash reporting, routing, handling asynchronous requests, etc

For example in the case of handling asynchronous requests, like an HTTP call to a server. Middleware is a great spot to do this.



Sources for above defination are
Source 1: http://redux.js.org/docs/advanced/Middleware.html
Source 2: https://www.fullstackreact.com/30-days-of-react/day-21/




