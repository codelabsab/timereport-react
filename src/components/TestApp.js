import React from "react";
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";



import {
  setAuthToken,
  setUsers,
  setTimeReport,
  setUser,
  setDateTimePeriod 
} from '../actions/index'
import { createStore } from 'redux'
import timeReportApp from '../reducers'


import { Provider } from 'react-redux'

// console.log(store.getState())
// const unsubscribe = store.subscribe(() => console.log('unsubscribe ->',store.getState()))
// // Dispatch some actions
// store.dispatch(setAuthToken('Auth Token'))
// store.dispatch(setUsers([{id:1}, {id:2}]))
// store.dispatch(setTimeReport([{timereport:1}]))
// store.dispatch(setUser("user"))
// store.dispatch(setDateTimePeriod('start_date', 'end_date'))
// // Stop listening to state updates
// unsubscribe()
const store = createStore(timeReportApp);
 const App = () => (

    
     <Provider store={store}>
        <div>App</div>
    </Provider>
 

 );
 export default App;