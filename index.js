
/*we are going to include middleware in our redux lifecycle 
we are going to use the 'redux logger' library for the middleware functions
for: logging; crash reporting; performing asynchronous tasks etc.. 

let's create a logger for our application.

the logger middleware is not compatible with the legacy code.
i need to change the legacy code(createStore()) with configureStore() and 
continue from there */



const redux = require('redux');
// const reduxLogger = require('redux-logger');

const createStore = redux.legacy_createStore;
const combineReducers = redux.combineReducers;
/*redux library gives us a function that is used to apply middleware 
which can be passed in as a 2nd parameter in createStore()*/

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
/*console log is removed  */
store.subscribe(() => {});


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())


store.dispatch(buyIceCream())
store.dispatch(buyIceCream())


console.log('current state', store.getState())


const unsubscribe = store.subscribe(() => {
  console.log('updated state', store.getState())
});

unsubscribe();

console.log('current state', store.getState())



