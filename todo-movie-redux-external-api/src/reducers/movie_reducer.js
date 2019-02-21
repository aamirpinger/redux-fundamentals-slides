import {
  ADD_MOVIE,
  REMOVE_MOVIE,
  MOVIE_WATCHED,
  INITIAL_DATA
} from '../actions/actions'

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
    case INITIAL_DATA:
      return action.movies
    default:
      return state
  }
}

export default movie_reducer


