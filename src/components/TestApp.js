import React, { Component } from 'react';
import { BrowserRouter as Router, HashRouter, Route, Link } from "react-router-dom";
import {
  setAuthToken,
  setUsers,
  setTimeReport,
  setUser,
  setDateTimePeriod
} from '../actions/index';

import { createStore } from 'redux';
import timeReportApp from '../reducers';
import NameSelectionComponent from '../components/NameSelectionComponent.red';
import DatePicker from '../components/DatePicker.red';
import * as WebService from '../services/WebService';
import * as TimeReportBuildService from '../services/TimeReportBuildService';

//import { Provider } from 'react-redux'

const store = createStore(timeReportApp);

export default class TestApp extends Component {
  handleInDateChange = (datePeriod) => {
    let query = {
      startDate: datePeriod.startDate,
      endDate: datePeriod.endDate,
      userName: store.getState().user
    };
    WebService.getTimeReport(query)
      .then(data => store.dispatch({ type: 'SET_TIME_REPORT', time_report: TimeReportBuildService.buildTimeReportData(data) }))
      .catch(this.handleError);
  }
  render() {
    return <div>
      <NameSelectionComponent
        users={store.getState().users}
        onChangeUserName={(uname) => store.dispatch({ type: 'SET_USER', user: uname })} />

      <DatePicker onDateChange={(datePeriod) => this.handleInDateChange(datePeriod)}
      />
    </div>
  }

}
