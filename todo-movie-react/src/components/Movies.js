import React from 'react'
import List from './List'

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
  
    return (
        <div>
            <h2>Movie to watch</h2>
            <input type="text" id="txt_movie" placeholder="Enter movie to watch name here..." />
            <button id="addMovie" onClick={addMovie}>
                Add Movie to List
            </button>

            <List items={props.movies}
                toggle={toggle_movie}
                delete={deleteMovie}
            />


        </div>
    )
}

export default Movies
