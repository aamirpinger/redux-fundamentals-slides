
import {
    CREATE_TASK
} from '../actions/actions'

// ES5 way of defining function
// function middlewareChecker(store) {
// return function (next) {
// return function (action) {

// ES6 makes it little easy by it way of defining arrow function
const middlewareChecker = (store) => (next) => (action) => {
    // this function will intercept dispatch function 
    // before invoking reducer function to chk for conditions provided before 
    // proceeding to reducer function

    if (
        action.type === CREATE_TASK &&
        action.tasks.name.toLowerCase().includes('pizza')
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

export default middlewareChecker

