# redux library used instead of custom created createStore function

This folder contains two files
  1) index.html
  2) index.js
  
Index.html file has basic page with two input text fields. First for Todo Task and 2nd for Movie to watch

Index.js contains all the javascript for redux store, actions, dispatchers, reducers and functionality for adding, toggle and deleting ToDo task and movie to watch from list on the browser's DOM

In this index.js we have used Redux library's Redux.createStore and Redux.combineReducers instead of our custom created createStore and root_reducer function
