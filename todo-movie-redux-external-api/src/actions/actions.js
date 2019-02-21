//const defining type of action object
export const CREATE_TASK = 'CREATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const TOGGLE_STATUS = 'TOGGLE_STATUS'

export const ADD_MOVIE = 'ADD_MOVIE'
export const REMOVE_MOVIE = 'REMOVE_MOVIE'
export const MOVIE_WATCHED = 'MOVIE_WATCHED'

export const INITIAL_DATA = 'INITIAL_DATA'
export const API = window.API


export function fetchInitialData() {
  return (dispatch) => Promise.all([API.fetchTasks(), API.fetchMovies()])
    .then(([tasks, movies]) => (
      dispatch({
        type: INITIAL_DATA,
        tasks,
        movies,
      })
    ))
}

export function createTaskAction(task) {
  return (dispatch) => API.saveTask(task)
    .then((tasks) => {
      dispatch({
        type: CREATE_TASK,
        tasks
      })
    })
    .catch(() => alert("something went wrong, try agian"))

}

export function deleteTaskAction(task) {

  return (dispatch) => {
    dispatch({
      type: DELETE_TASK,
      id: task.id
    })
    API.deleteTask(task).catch(() => {
      alert("Try again!")

      dispatch({
        type: CREATE_TASK,
        tasks: task
      })
    })
  }
}

export function toggleTaskStatusAction(id) {
  return dispatch => {
    dispatch({
      type: TOGGLE_STATUS,
      id,
    })
    API.toggleTask(id)
      .catch(() => {
        alert("something went wrong, try again")
        dispatch({
          type: TOGGLE_STATUS,
          id,
        })
      })
  }
}


export function createMovieAction(movie) {
  return (dispatch) => API.saveMovie(movie)
    .then((movies) => {
      dispatch({
        type: ADD_MOVIE,
        movies
      })
    })
    .catch(() => {
      alert("Can't save movie  now, network error. Try later")
    })
}

export function deleteMovieAction(movie) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_MOVIE,
      id: movie.id
    })

    return API.deleteMovie(movie)
      .catch(() => {
        alert("Can't delete, network error. Please try again!")
        dispatch({
          type: ADD_MOVIE,
          movies: movie
        })
      })
  }
}
export function movieWatchedAction(id) {
  return (dispatch) => {
    dispatch({
      type: MOVIE_WATCHED,
      id
    })

    return API.toggleMovie(id)
      .catch(() => {
        alert("Can't toggle, network error. Please try again!")
        dispatch({
          type: MOVIE_WATCHED,
          id,
        })
      })
  }
}

