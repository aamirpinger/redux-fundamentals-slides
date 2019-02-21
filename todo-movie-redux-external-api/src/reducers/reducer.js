import { combineReducers } from 'redux'
import task_reducer from './task_reducer'
import movie_reducer from './movie_reducer'
import Loading from './Loading'

export default combineReducers({
  tasks: task_reducer,
  movies: movie_reducer,
  Loading
})
