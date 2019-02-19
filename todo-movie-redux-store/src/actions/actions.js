//const defining type of action object
export const CREATE_TASK = 'CREATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const TOGGLE_STATUS = 'TOGGLE_STATUS'

export const ADD_MOVIE = 'ADD_MOVIE'
export const REMOVE_MOVIE = 'REMOVE_MOVIE'
export const MOVIE_WATCHED = 'MOVIE_WATCHED'

// following are action creators, these will simply return action objects
export function createTaskAction(task) {
  return {
    type: CREATE_TASK,
    tasks: {
      id: generateId(),
      name: task,
      done: false
    },
  }
}

export function deleteTaskAction(id) {
  return {
    type: DELETE_TASK,
    id,
  }
}
export function toggleTaskStatusAction(id) {
  return {
    type: TOGGLE_STATUS,
    id,
  }
}

export function createMovieAction(movie) {
  return {
    type: ADD_MOVIE,
    movies: {
      id: generateId(),
      name: movie,
      done: false
    },
  }
}
export function deleteMovieAction(id) {
  return {
    type: REMOVE_MOVIE,
    id,
  }
}
export function movieWatchedAction(id) {
  return {
    type: MOVIE_WATCHED,
    id,
  }
}


function generateId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}
