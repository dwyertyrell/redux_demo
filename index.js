

/*asynchronous actions

typically with data fetching, we use pre-defined properties for the (initial) 
state.

state {
  loading: true, 
  data: [],
  errors: '' 
  }

  the loading flag (called flag as it's a boolean concept) can help display a 
  loading spinner if your app has a UI (style in your component).

  the data in this repo is a list of users from the fetch. the initial state 
  is an empty array- as no users have been loaded yet.

  the final property is an error message- in case the api request might fail.
  instead of getting back the data, we get an error that is stored in the error 
  property. this property can display an error to the user, if your 
  application has a UI


  Actions
  we'll have 3 actions in our application.

  FETCH_USERS_REQUESTED - fetch list of users
  the 2nd and 3rd actions are dependent on the 1st one

  FETCH_USERS_SUCCEEDED- fetched successfully 

  FETCH_USERS_FAILED- if there's an error when fetching the data

  Reducers
  if (action.type) is:
    case FETCH_USERS_REQUESTED: 
      we set loading to true 

    case FETCH_USERS_SUCCEEDED: 
      we set loading to false
      and set data to users (data from api)  

    case FETCH_USERS_FAILED: 
      we set loading to false 
      set errors to equal the error.messgae from response object.

create asyncActions.js for this new code 
*/








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



