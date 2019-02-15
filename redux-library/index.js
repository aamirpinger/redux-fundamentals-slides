/*
function createStore(reducer) {
    // The store should have four parts
    // 1. The state
    // 2. Get the state
    // 3. Listen to changes on the state
    // 4. Update the state
  
  
    let state
    let listeners = []
  
    /*
    // this subscribe function will only add listner to listerners array
    const subscribe = (listener) => {
      listeners.push(listener)
    }
  *-/
  
    // this subscribe function will add listner to listerners array and return a callback
    // to unsubscribe (remove that listener from listeners array)
    const subscribe = (listener) => {
      listeners.push(listener)
      return () => {
        listeners = listeners.filter((l) => l !== listener)
      }
    }
  
    // getState will simply return the state
    const getState = () => state
  
    // Purpose of dispatch funtion is to triger state change by
    // forwarding action to reducers function, second part of this function is to
    // invoke all the listener function add in listeners array
    const dispatch = (action) => {
      state = reducer(state, action)
      listeners.forEach(listener => listener())
    }
  
    return {
      getState,
      subscribe,
      dispatch
    }
  }
  
  */

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
    tasks: task,
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
    movies: movie,
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
          ? Object.assign({}, r, { done: !r.done })
          : r)
    case CREATE_TASK:
      return state.concat([action.tasks])
    default:
      return state
  }
}


function movie_reducer(state = [], action) {
  // this function will cater all the action related to Movies list

  switch (action.type) {
    // This switch case will check for incoming action's type and perform task accordingly
    case ADD_MOVIE:
      return state.concat([action.movies])
    case REMOVE_MOVIE:
      return state.filter((r) => r.id !== action.id)
    case MOVIE_WATCHED:
      return state.map((r) => (r.id === action.id) ? Object.assign({}, r, { done: !r.done }) : r)
    default:
      return state
  }
}

/*
function root_reducer(state = [], action) {
  // this function will hold all the reducers and only this will be passed to store as
  // reducer function. Whenever dispatch function in store will call reducer function
  // all the reducer function that is listed in this function will get invoked
 
  return {
    tasks: task_reducer(state.tasks, action),
    movies: movie_reducer(state.movies, action),
  }
  
}

*/

// this will create store and pass root_reducer as universal reducer to it
//const store = Redux.createStore(root_reducer)
const store = Redux.createStore(Redux.combineReducers({
  tasks: task_reducer,
  movies: movie_reducer,
}))

function addToDoTask() {
  const name = document.getElementById("txt_task")
  const value = name.value
  name.value = ''

  store.dispatch(createTaskAction({
    id: generateId(),
    name: value,
    //description: "Going Jogging 3 km 7 in the morning",
    done: false
  }))
}
function addMovie() {
  const name = document.getElementById("txt_movie")
  const value = name.value
  name.value = ''

  store.dispatch(createMovieAction({
    id: generateId(), //Date.now(),
    name: value, //"Mission Impossible",
    done: false
  }))
}

// this is how we can subscribe any listener, invoking unsubscribe() afterward will remove this 
// listener from listeners array
unsubscribe = store.subscribe(() => {
  // console.log('Show me the current state', store.getState())

  const { tasks, movies } = store.getState()
  document.getElementById("task-list").innerHTML = ''
  tasks.forEach(t => addTaskToDom(t))
  document.getElementById("movie-list").innerHTML = ''
  movies.forEach(m => addMovieToDom(m))

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

  a.style.textDecoration = (t.done) && "line-through"
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

  a.style.textDecoration = (m.done) && "line-through"

  const rmvBtn = document.createElement("button")
  const btnText = document.createTextNode("x")
  rmvBtn.appendChild(btnText)
  rmvBtn.setAttribute("onclick", "deleteMovie('" + m.id + "')")
  li.appendChild(rmvBtn)

}


function generateId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

