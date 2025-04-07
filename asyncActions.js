const redux = require('redux');
const createStore = redux.createStore;
const axios = require('axios');
const applyMiddleware = redux.applyMiddleware;
const thunk = require('redux-thunk').default;
// const thunk =  require('redux-thunk').thunk
// const {thunk} = require('redux-thunk')



// in this file we need to define 3 things: the state; the actions; the reducer.

//declaring the (initial) state
const initialState = {
  loading: false,
  users: [],
  error:''
}

// declare the constants of the action types
const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED'
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'


//define the action creators:
//request to fethced the data
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }

}

//store the list of users if the fetch is successful
const fetchUsersSuccess = (users) => {
  return {
  type: FETCH_USERS_SUCCEEDED,
  payload: users
}
}

//store the error message if the request failed.
const fetchUsersFailure = error => {
  // return an object where the type is FETCH_USERS_FAILED and the payload is error 
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}

//next let's define our reducer function. 
const reducer = (state= initialState, action) => {
  /*in the switch statement we are accessing the object that is returned from the
  action creator */
  switch(action.type) {
    case FETCH_USERS_REQUESTED:
      /*return a new object, spread the existing state and set loading to true */
      return { 
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCEEDED: 
      return {
        ...state,
        users: action.payload,
      }
    case FETCH_USERS_FAILED: 
      return {
        ...state,
        error: action.payload

      }

      /*we are not directly accessing the data from API with the reducer; we are 
      accessing the payload from the action creators, we stored the fetched data 
      in its parameter.  */
  }
}

/*the final step is to create our redux store at the top of the file and then 
pass in a reducer function in store*/

const store = createStore(reducer, applyMiddleware(thunk))

/*next is to make an API call and dispatch the appropiate actions  */

/*using action creators with network requests- how to make an api call when 
working with redux.

packages to install: axios and redux thunk

redux thunk- the standard way to define async action creators in the app. it is 
basically a middleware that is applied to out redux store.
pass this thunkMiddleware into the applyMiddleware()
*/

/*next is to define our async action creator.*/
/* although an action creator returns an action object, a thunk middleware gives 
the ability for the action creator to return a function instead.
this function doesn't have to be pure- allowed to have side effects e.g. async 
tasks (calls to api ). 
because it recieves the dispatch method as its argument, it's allowed to dispatch 
actions.  */

/*the async action creator */
const fetchUsers = () => {
  /*before we call to api, we dispatch fetchUsersRequest(). this action creator
  will set loading to true */
  store.dispatch(fetchUsersRequest);

  return (
    function(dispatch) {
      

    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      const users = response.data.map((user) => user.id)
      /* we dispacth an action that stores the fetched data in state */
      store.dispatch(fetchUsersSuccess(users))
    }).catch((error) => {
      // error.message will be the value of the error state
      store.dispatch(fetchUsersFailure(error.message))
    })

  }
)
}

/*now subscribe to store and dispatch this asyn action creator */

store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())