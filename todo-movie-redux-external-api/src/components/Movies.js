import React from 'react'
import List from './List'
import { connect } from 'react-redux'

import {
    movieWatchedAction,
    deleteMovieAction,
    createMovieAction
} from '../actions/actions'

// I have created Task as class component and Movies as functional component 
// Purpose of doing both in two differnt ways is just to show the 
// way of doing both ways. As these both are stateless component so we hav
// choice of doing in any of these two ways  
function Movies(props) {

    return (
        <div>
            <h2>Movie to watch</h2>
            <input type="text" id="txt_movie" placeholder="Enter movie to watch name here..." />
            <button id="addMovie" onClick={props.addMovie}>
                Add Movie to List
            </button>

            <List items={props.movies}
                toggle={props.toggle_movie}
                delete={props.deleteMovie}
            />


        </div>
    )
}

//export default Movies

const mapDispatchToProps = dispatch => ({
    deleteMovie: (movie_id) => { dispatch(deleteMovieAction(movie_id)) },
    toggle_movie: (movie_id) => { dispatch(movieWatchedAction(movie_id)) },
    addMovie: () => {
        const name = document.getElementById("txt_movie")
        const value = name.value
        name.value = ''
        dispatch(createMovieAction(value))
    }
})

//below is the connect function which basically takes slice of state from store and
// dispatch functions and then attach it to provided component's as props which here is Movie component
// this connect function at end will return a connected component with state from the store
export default connect((state) => ({
    movies: state.movies
}), mapDispatchToProps)(Movies)



// as we have provided following functions in connect function's propsFromDispatch
// property so we will not add following functions as part of our above Movie component
// these following function are accessed as a props function in new connected component

/*
  const toggle_movie = (movie_id) => {
      props.dispatch(movieWatchedAction(movie_id))
  }



  const deleteMovie = (movie_id) => {
      props.dispatch(deleteMovieAction(movie_id))
  }

  const addMovie = () => {
      const name = document.getElementById("txt_movie")
      const value = name.value
      name.value = ''
      props.dispatch(createMovieAction(value))
  }

*/