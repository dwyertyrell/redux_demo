/*if this was a react application, we would use import. however we are using 
this app as a simple node.js application. hence require() syntax  */

const redux = require('redux');
/*redux.createStore method had been deprecated*/
const createStore = redux.legacy_createStore

/* npm init --yes    to install the package manager for this repo 
add redux as a dependency for the project 
npm install redux*/

console.log('from index.js')

/*let's define our string constant that holds the value of action.type */
const BUY_CAKE = 'BUY_CAKE'

/*an action is an object with a  type property */
{
  type: BUY_CAKE
  info: 'first redux action'
}

/*an action creator is a fucntion that returns an action */

function buyCake() {
  return (
    {
      type: BUY_CAKE,
      info: 'first redux action'
    }
  )
}

/*a reducer is a function that accepts the current state and action as arguments
and then returns the next state of the application
function reducer(prevState, action) => newState */

/* our application state has to be represented by a single object. */

const initialState = {
  numOfCakes: 10
}

/* for the state parameter we provide a default value. */
const reducer = (state= initialState, action) => {
  /*now apply a switch statement, where the switch expression is action.type */
  switch (action.type) {

    /*if action.type is BUY_CAKE, then return a new object with the all of its
    previous properties as well as the updated property*/
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
      }
    /*if there is an action that we haven't accounted for, then return the state 
  as is */
  default: return state
  }
  /*in the case example, we are not mutating the state object- we are returning 
  a new object */
}

/*redux store is responsible:
  for holding the application state.
  allows access to the current state of the application via getState().
  allows the app to subscribe to changes in the store via subcribe(listener).
  provides a method to update the state via dispatch(action).
  to unsubscribe from the store by calling function return by the subscribe 
  method.
  
    */
/*accepts a parameter which is the reducer function */

const store = createStore(reducer)
console.log('initial state', store.getState())

store.subscribe(() => console.log('updated state', store.getState()));
/*we can directly put in the action or we could use the action creator. 
let's dispatch the same action 3 times- 3 customers buying cakes */

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

console.log('current state', store.getState())


const unsubscribe = store.subscribe(() => {
  console.log('updated state', store.getState())
});

unsubscribe()
console.log('current state', store.getState())

/*flow of redux:
create a store.
declare the initial state and reducer.
define the actions and action creators.
subscribe to the store.
dispatch actions to update the store.
and finally, unsubcribe to the changes.
This is the essence of redux. 
In a react application, this is exactly what we do, but with a few helper 
functions.

having an action creator, any changes happening to the action object, is only 
happening in only one place- adding a property to the action object will be 
easier. so when we want to access action in a dispatch(),
we are doing so dynamically.
 */