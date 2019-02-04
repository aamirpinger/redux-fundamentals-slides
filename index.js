

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
*/

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


function root_reducer(state = [], action) {
  // this function will hold all the reducers and only this will be passed to store as
  // reducer function. Whenever dispatch function in store will call reducer function
  // all the reducer function that is listed in this function will get invoked

  return {
    task: task_reducer(state.task, action),
    movie: movie_reducer(state.movie, action),
  }


}


// this will create store and pass root_reducer as universal reducer to it
const store = createStore(root_reducer)


// this is how we can subscribe any listener, invoking unsubscribe() afterward will remove this 
// listener from listeners array
unsubscribe = store.subscribe(() => console.log('Show me the current state', store.getState()))


//this is the way to discpatch any action to store, store then forward 
//this aciton and state to reducer
store.dispatch(createMovieAction({
  id: "0",
  name: "Mission Impossible",
  watched: false
}))

store.dispatch(createMovieAction({
  id: "1",
  name: "Transporter",
  watched: false
}))


store.dispatch(movieWatchedAction("0"))

store.dispatch(createTaskAction({
  id: "0",
  name: "Jogging",
  task_done: false
}))

