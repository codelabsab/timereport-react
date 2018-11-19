import React from 'react'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import NameSelection from './NameSelection.red'
import DatePicker from './DatePicker.red'
import TimeReportSection from './TimeReportSection.red'
import reducers from '../reducers';
import { getAllUsers } from '../actions'


const store = createStore(
  reducers,
  applyMiddleware(thunk)
)
store.dispatch(getAllUsers());

const DashBoard = () => (
  <Provider store={store}>
    <div>
      <NameSelection />
      <DatePicker />
      <TimeReportSection />
    </div>
  </Provider>

)

export default DashBoard