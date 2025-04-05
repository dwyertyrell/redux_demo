// exact copy as the latest file in 'TutorialVideo'
const redux = require('redux');
const createStore = redux.legacy_createStore;
const combineReducers = redux.combineReducers;


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



/*another approach of using multiple reducers 

we are going to split our state and reducers */

const initialStateCake = {
  numOfCakes: 10
}

const initialStateIceCream = {
  numOfIceCreams: 20
}

/*have a reducer for each state  */
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


/*although we have separated the reducer function for each state, the 
createStore() can only accept one reducer... 

redux uses a method called combineReducers- uses combines multiple reducers into
one, which can be passed to the createStore()

before we create our store, we combine our reducers. */

/*call the combination of all the reducers as rootReducers */


const rootReducers = combineReducers({
  /*accepts an object- each key-value pair corresponds to a reducer*/
  cake: cakeReducer,
  iceCream: iceCreamReducer
})
/*now the createStore() will accept the rootReducer as its paramater */
const store = createStore(rootReducers)

/* now the global state has two nested objects, if you want to access the 
numOfCakes it is state.cake.numOfCakes */

console.log('initial state', store.getState())

store.subscribe(() => console.log('updated state', store.getState()));


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())


/*let's dispatch an action to buy an ice cream */
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())


console.log('current state', store.getState())


const unsubscribe = store.subscribe(() => {
  console.log('updated state', store.getState())
});

unsubscribe();

console.log('current state', store.getState())



