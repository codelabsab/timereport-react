import React, { Component } from 'react';
import DashBoard from '../containers/DashBoard.red';

// import { createStore } from 'redux';
// import timeReportApp from '../reducers';
// import NameSelectionComponent from '../components/NameSelectionComponent.red';
// import DatePicker from '../components/DatePicker.red';
// import * as WebService from '../services/WebService';
// import * as TimeReportBuildService from '../services/TimeReportBuildService';
// import TimeReportTable from '../components/TimeReportTable.red';
// import * as StorageService from '../services/StorageService';
// import { NotifyContainer, NotifyService } from '../services/NotifyService';

//const store = createStore(timeReportApp);

export default class TestApp extends Component {
  render(){
    return <DashBoard/>;
  }

  // componentWillMount = () => {
  //   store.subscribe(() => console.log(store.getState()))
  //   store.dispatch({ type: 'SET_SLACK_USER', slack_user: this.getSlackUserFromSession() })
  // }

  // /////????
  // getSlackUserFromSession = () => {
  //   let slackUser = StorageService.getSlackUser();
  //   //if (this.props.isSignIn && slackUser == null) {
  //   if (slackUser == null) {
  //     this.handleError(new Error('Slack user not found!'));
  //     StorageService.resetAccessToken();
  //     return;
  //   }
  //   return slackUser;
  // }

  // handleError = (e) => {
  //   let errorMessage = 'Error : ' + (e.message || 'Error Occured');
  //   NotifyService.notify(errorMessage);
  // }

  // handleInDateChange = (datePeriod) => {
  //   let query = {
  //     startDate: datePeriod.startDate,
  //     endDate: datePeriod.endDate,
  //     userName: store.getState().user
  //   };
  //   WebService.getTimeReport(query)
  //     .then(data => store.dispatch({ type: 'SET_TIME_REPORT', time_report: TimeReportBuildService.buildTimeReportData(data) }))
  //     .catch(this.handleError);
  // }

  // handleInTimeReportChange(change, action) {
  //   if (action === 'ADD') {
  //     if (!this.validateInput(change)) {
  //       this.handleError(new Error('Invalid data!'));
  //       return;
  //     }

  //     let timeReportToCreate = {
  //       user_id: change.user_id,
  //       user_name: change.user_name,
  //       type_id: change.type_id,
  //       start: change.start,
  //       hours: parseInt(change.hours),
  //     };
  //     WebService.createTimeReport(timeReportToCreate)
  //       .then(newUser => {
  //         let newUserBuild = TimeReportBuildService.buildTimeReportSingle(newUser);
  //         let timeReportDataWithAddedUser = store.getState().time_report.concat([newUserBuild]);

  //         store.dispatch({ type: 'SET_TIME_REPORT', time_report: timeReportDataWithAddedUser });
  //       })
  //       .catch(this.handleError);
  //   }

  //   if (action === 'DELETE') {
  //     let timeReportDataExceptDeleted = store.getState().time_report.filter(t => t.id !== change.id);
  //     WebService.deleteTimeReport(change)
  //       .then(response => store.dispatch({ type: 'SET_TIME_REPORT', time_report: timeReportDataExceptDeleted }))
  //       .catch(this.handleError);

  //   }

  //   if (action === 'EDIT') {
  //     let timeReportMapped = store.getState().time_report.map(t => {
  //       if (t.id === change.id)
  //         t.setEditable(true);
  //       return t;
  //     });
  //     store.dispatch({ type: 'SET_TIME_REPORT', time_report: timeReportMapped });
  //   }

  //   if (action === 'EDIT_DONE') {
  //     if (!this.validateInput(change)) {
  //       this.handleError(new Error('Invalid data!'));
  //       return;
  //     }
  //     let timeReportMapped = this.state.timeReportData.map(t => {
  //       if (t.id === change.id) {
  //         t.setEditable(false);
  //         t.type_id = change.type_id;
  //         t.start = change.start;
  //         t.hours = parseInt(change.hours);
  //       }
  //       return t;
  //     });

  //     WebService.updateTimeReport(change)
  //       .then(response => store.dispatch({ type: 'SET_TIME_REPORT', time_report: timeReportMapped }))
  //       .catch(this.handleError);

  //   }
  // }



  // render() {
  //   return <div>
  //     <NameSelectionComponent
  //       users={store.getState().users}
  //       onChangeUserName={(uname) => store.dispatch({ type: 'SET_USER', user: uname })} />

  //     <DatePicker onDateChange={(datePeriod) => this.handleInDateChange(datePeriod)}
  //     />

  //     <TimeReportTable
  //       slackUser={store.getState().slack_user}
  //       data={store.getState().time_report}

  //       showNewRow={store.getState().show_new_row}
  //       onAdd={() => store.dispatch({ type: 'SET_USER', user: uname })}

  //       onChange={(change, action) => this.handleInTimeReportChange(change, action)}
  //     />
  //     <NotifyContainer />
  //   </div>
  // }

}
