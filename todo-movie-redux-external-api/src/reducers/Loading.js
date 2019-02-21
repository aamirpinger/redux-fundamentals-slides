import {
    INITIAL_DATA
  } from '../actions/actions'
  
  function Loading(state = true, action) {
    switch (action.type) {
      case INITIAL_DATA:
        return false
    //  default:
    //       return true
    }
    return state
  }
  
  export default Loading
  
  
  