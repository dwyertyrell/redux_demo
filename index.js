
const redux = require('redux');
// const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const applyMiddleware = redux.applyMiddleware();
// const logger = reduxLogger.createLogger()

console.log('from index.js')


const BUY_CAKE = 'BUY_CAKE'

{
  type: BUY_CAKE
  info: 'first redux action'
}


function buyCake() {
  return (
    {
      type: BUY_CAKE,
      info: 'first redux action'
    }
  )
}


const BUY_ICECREAM = 'BUY_ICECREAM'

{
  type: BUY_ICECREAM
  info: '2nd redux action for handling multiple reducers'
}

function buyIceCream() {
  return (
    {
      type: BUY_ICECREAM,
      info: '2nd redux action for handling multiple reducers'
    }
  )
}



const initialStateCake = {
  numOfCakes: 10
}

const initialStateIceCream = {
  numOfIceCreams: 20
}

const cakeReducer = (state= initialStateCake, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
      }
      default: return state

    }
}

const iceCreamReducer = (state= initialStateIceCream, action) => {
  switch (action.type) {
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
      }
    case BUY_CAKE:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1
      }
      default: return state


    }
}


const rootReducers = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})
// const store = createStore(rootReducers, applyMiddleware(logger))
// the logger middleware is not compatible with the legacy code. 
const store = createStore(rootReducers)

/*we can remove the console.log description of the store- since we have the 
logger function to handle all of that. */



console.log('initial state', store.getState())
/*console log is removed if redux-looger is installed  */
const unsubscribe = store.subscribe(() => {console.log('updated state', store.getState())});


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())


// store.dispatch(buyIceCream())
// store.dispatch(buyIceCream())

  
// const unsubscribe = store.subscribe(() => {
//   console.log('updated state', store.getState())
// });

unsubscribe();



/* although there are separate reducers, when we dispatch an action both reducers
recieve that action.
one of them acts, and the other just ignores it.

let's create an action: for every cake sold, we want to give one icecream for 
free.
solution: add a new case in iceCreamReducer, with the action type being a cake 
constant.

in conclusion, although iceCreamReducer can only update the num of Ice-creams, 
it can still respond to the CAKE_ORDERED action type, if its being called.

this does not happen in redux-toolkit.

reducers from one createSlice() will only respond to the action types generated 
from the same slice.
if you want a slice to respond to other action types, despite the ones it created,
we need to make use of extra reducers- additional reducers apart from the reducer 
generated from createSlice()...check 'rtk-demo' folder
*/

