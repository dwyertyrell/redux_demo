
const redux = require('redux');

const createStore = redux.legacy_createStore


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
const cakeReducer = (state= initialStateCake, buyCake) => {
  switch (action.type) {

  
    case BUY_CAKE: return {
      ...state,
      numOfCakes: state.numOfCakes - 1
      }

    }
}

const iceCreamReducer = (state= initialStateIceCream, buyIceCream) => {
  switch (action.type) {

  
    case BUY_ICECREAM: return {
      ...state,
      numOfIceCreams: state.numOfIceCreams - 1
      }

    }
}


/*although we have separated the reducer function for each state, the 
createStore() can only accept one reducer... */


const store = createStore(reducer)
console.log('initial state', store.getState())

store.subscribe(() => console.log('updated state', store.getState()));


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())


/*let's dispatch an action to buy an ice cream */
store.dispatch(buyIceCream())

console.log('current state', store.getState())


const unsubscribe = store.subscribe(() => {
  console.log('updated state', store.getState())
});

unsubscribe();

console.log('current state', store.getState())



