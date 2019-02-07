//const defining type of action object
const CREATE_TASK = 'CREATE_TASK'
const DELETE_TASK = 'DELETE_TASK'
const TOGGLE_STATUS = 'TOGGLE_STATUS'

const ADD_MOVIE = 'ADD_MOVIE'
const REMOVE_MOVIE = 'REMOVE_MOVIE'
const MOVIE_WATCHED = 'MOVIE_WATCHED'

// following are action creators, these will simply return action objects
function createTaskAction(task) {
  return {
    type: CREATE_TASK,
    task,
  }
}

function deleteTaskAction(id) {
  return {
    type: DELETE_TASK,
    id,
  }
}
function toggleTaskStatusAction(id) {
  return {
    type: TOGGLE_STATUS,
    id,
  }
}

function createMovieAction(movie) {
  return {
    type: ADD_MOVIE,
    movie,
  }
}
function deleteMovieAction(id) {
  return {
    type: REMOVE_MOVIE,
    id,
  }
}
function movieWatchedAction(id) {
  return {
    type: MOVIE_WATCHED,
    id,
  }
}


function task_reducer(state = [], action) {
  // this function will cater all the action related to ToDo Tasks

  switch (action.type) {
    // This switch case will check for incoming action's type and perform task accordingly
    case DELETE_TASK:
      return state.filter((r) => r.id !== action.id)
    case TOGGLE_STATUS:
      return state.map((r) =>
        (r.id === action.id)
          ? Object.assign({}, r, { task_done: !r.task_done })
          : r)
    case CREATE_TASK:
      return state.concat([action.task])
    default:
      return state
  }
}

function movie_reducer(state = [], action) {
  // this function will cater all the action related to Movies list

  switch (action.type) {
    // This switch case will check for incoming action's type and perform task accordingly
    case ADD_MOVIE:
      return state.concat([action.movie])
    case REMOVE_MOVIE:
      return state.filter((r) => r.id !== action.id)
    case MOVIE_WATCHED:
      return state.map((r) => (r.id === action.id) ? Object.assign({}, r, { watched: !r.watched }) : r)
    default:
      return state
  }
}

//we will not use validateDispatch as we will use Redux middleware
// look for middlewareChecker function

/*
function validateDispatch(store, action) {
  // this function will intercept dispatch function 
  // and chk for conditions provided before 
  // proceeding to reducer
  if (
    action.type === CREATE_TASK &&
    action.task.name.toLowerCase().includes('pizza')
  ) {
    return alert("Sorry, you are on diet, No Pizza!")
  }
  else {
    return store.dispatch(action)
  }
}
*/


// ES5 way of defining function
// function middlewareChecker(store) {
//   return function (next) {
//     return function (action) {

// ES6 makes it little easy by it way of defining arrow function
const middlewareChecker = (store) => (next) => (action) => {
  // this function will intercept dispatch function 
  // before invoking reducer function to chk for conditions provided before 
  // proceeding to reducer function

  if (
    action.type === CREATE_TASK &&
    action.task.name.toLowerCase().includes('pizza')
  ) {
    return alert("Sorry, you are on diet, No Pizza!")
  }

  //instead of returning store.dispatch we will return next function, this could be 
  // another middleware or reducer function as it is in our case
  //return store.dispatch(action)
  return next(action)

  // these two lines are commented because we have adopted ES6 arrow function instead of ES5 functions
  //   }  
  // }
}

// This logger function will console.log app's state before any action performed,
// it will log action itself and after updating state based on action
// this function will log updated state to console
const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.time('Time to complete transaction')
      console.log('App current state: ', store.getState())
      console.log('Action dispatched: ', action)
      const response = next(action)
      console.log('App updated state: ', store.getState())
    console.timeEnd('Time to complete transaction')
  console.groupEnd()
  return response
}

//As a second argument of createStore function we will pass Redux.applyMiddleware function
// and we will pass our new middlewareChecker function to this Redux.applyMiddleware function 
const store = Redux.createStore(Redux.combineReducers({
  task: task_reducer,
  movie: movie_reducer,
}), Redux.applyMiddleware(middlewareChecker, logger))




function addToDoTask() {
  const name = document.getElementById("txt_task")
  const value = name.value
  name.value = ''

  store.dispatch(createTaskAction({
    //validateDispatch(store, createTaskAction({
    id: generateId(),
    name: value,
    task_done: false
  }))
}



function addMovie() {
  const name = document.getElementById("txt_movie")
  const value = name.value
  name.value = ''

  store.dispatch(createMovieAction({
    id: generateId(),
    name: value,
    watched: false
  }))
}



// this is how we can subscribe any listener, invoking unsubscribe() afterward will remove this 
// listener from listeners array
unsubscribe = store.subscribe(() => {
  const { task, movie } = store.getState()
  document.getElementById("task-list").innerHTML = ''
  task.forEach(t => addTaskToDom(t))
  document.getElementById("movie-list").innerHTML = ''
  movie.forEach(m => addMovieToDom(m))

})



function toggle_task(task_id) {
  store.dispatch(toggleTaskStatusAction(task_id))
}

function toggle_movie(movie_id) {
  store.dispatch(movieWatchedAction(movie_id))
}


function deleteTask(task_id) {
  store.dispatch(deleteTaskAction(task_id))
}

function deleteMovie(movie_id) {
  store.dispatch(deleteMovieAction(movie_id))
}

function addTaskToDom(t) {
  const ul = document.getElementById("task-list")
  const li = document.createElement("li")
  const a = document.createElement("a")
  li.setAttribute("id", t.id)
  a.setAttribute("href", "#")

  // Two ways to assigning event listner
  //a.setAttribute("onclick","toggle_task('" + t.id + "')")
  a.addEventListener("click", () => toggle_task(t.id))

  const item = document.createTextNode(t.name)

  a.appendChild(item)
  li.appendChild(a)
  ul.appendChild(li)

  a.style.textDecoration = (t.task_done) && "line-through"
  const rmvBtn = document.createElement("button")
  const btnText = document.createTextNode("x")
  rmvBtn.appendChild(btnText)
  rmvBtn.setAttribute("onclick", "deleteTask('" + t.id + "')")
  li.appendChild(rmvBtn)
}

function addMovieToDom(m) {
  const ul = document.getElementById("movie-list")
  const li = document.createElement("li")
  const a = document.createElement("a")
  li.setAttribute("id", m.id)
  a.setAttribute("href", "#")

  // Two ways to assigning event listner
  //a.setAttribute("onclick","toggle_movie('" + m.id + "')")
  a.addEventListener("click", () => toggle_movie(m.id))

  const item = document.createTextNode(m.name)
  a.appendChild(item)
  li.appendChild(a)
  ul.appendChild(li)

  a.style.textDecoration = (m.watched) && "line-through"

  const rmvBtn = document.createElement("button")
  const btnText = document.createTextNode("x")
  rmvBtn.appendChild(btnText)
  rmvBtn.setAttribute("onclick", "deleteMovie('" + m.id + "')")
  li.appendChild(rmvBtn)

}


function generateId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}
