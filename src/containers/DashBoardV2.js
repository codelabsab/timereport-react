import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import NameSelectionComponent from '../components/NameSelectionComponent';
import DatePicker from '../components/DatePicker';
import TimeReportTable from '../components/TimeReportTableV2';
import * as WebService from '../services/WebService';
import * as StorageService from '../services/StorageService';
import * as TimeReportBuildService from '../services/TimeReportBuildService';
import { NotifyContainer, NotifyService } from '../services/NotifyService';
import ReactLoading from "react-loading";
import * as TimeReportValidator from '../services/TimeReportDatavalidationService';
import * as TimeReportAction from '../constants/ActionTypes';

export default class DashBoardV2 extends Component {
  constructor(props) {
    super(props);
    this.getUsersAndDatePickers();
    this.state = { timeReportData: [] };
  }

  getUsersAndDatePickers = () => WebService.getUsersV2()
    .then(users => {
      let unqueUsers = [...new Set(users.map(u => u.user_name))];
      this.setState({ users: unqueUsers })
    })
    .catch(this.handleError);

  handleError = (e) => {
    let errorMessage = 'Error : ' + (e.message || 'Error Occured');
    NotifyService.notify(errorMessage);
  }

  handleInUserNameChange = (userName) => this.setState({ user: userName });

  handleInDateChange(datePeriod) {
    let query = {
      startDate: datePeriod.startDate,
      endDate: datePeriod.endDate,
      userName: this.state.user
    };
    WebService.getTimeReportV2(query)
      .then(data => this.setState({ timeReportData: TimeReportBuildService.buildTimeReportData(data) }))
      .catch(this.handleError);
  }

  handleInTimeReportChange(change, action) {


    if (!this.isAllowedOperation(change, action)) {
      this.handleError(new Error('Permission Denied, user not same!'));
      return;
    }

    if (action === TimeReportAction.ADD) {
      if (!this.validateInput(change)) {
        this.handleError(new Error('Invalid data!'));
        return;
      }

      let timeReportToCreate = {
        user_id: change.user_id,
        user_name: change.user_name,
        reason: change.reason,
        event_date: change.event_date,
        hours: parseInt(change.hours),
      };
      WebService.createTimeReportV2(timeReportToCreate)
        .then(newUser => {
          let newUserBuild = TimeReportBuildService.buildTimeReportSingle(newUser);
          let timeReportDataWithAddedUser = this.state.timeReportData.concat([newUserBuild]);
          this.setState({ timeReportData: timeReportDataWithAddedUser });
        })
        .catch(this.handleError);
    }

    if (action === TimeReportAction.DELETE) {
      let timeReportDataExceptDeleted = this.state.timeReportData.filter(t => t.id !== change.id);
      WebService.deleteTimeReportV2(change)
        .then(response => this.setState({ timeReportData: timeReportDataExceptDeleted }))
        .catch(this.handleError);

    }

    if (action === TimeReportAction.EDIT) {
      let timeReportMapped = this.state.timeReportData.map(t => {
        if (t.id === change.id)
          t.setEditable(true);
        return t;
      });
      this.setState({ timeReportData: timeReportMapped });
    }

    if (action === TimeReportAction.EDIT_DONE) {
      if (!this.validateInput(change)) {
        this.handleError(new Error('Invalid data!'));
        return;
      }
      change.end = change.start;
      let timeReportMapped = this.state.timeReportData.map(t => {
        if (t.id === change.id) {
          t.setEditable(false);
          t.reason = change.reason;
          t.event_date = change.event_date;
          t.hours = parseInt(change.hours);
        }
        return t;
      });

      WebService.updateTimeReportV2(change)
        .then(response => this.setState({ timeReportData: timeReportMapped }))
        .catch(this.handleError);

    }
  }

  validateInput = (input) => (input.reason.length > 0 && TimeReportValidator.validateDate(input.event_date) && TimeReportValidator.validateHour(input.hours));

  isAllowedOperation = (change, action) => {
    let isAddOrDEL = action === TimeReportAction.EDIT || action === TimeReportAction.DELETE;
    if (!isAddOrDEL)
      return true;
    let slackUser = StorageService.getSlackUser();
    let isRequestForSameUser = slackUser.name === change.user_name;
    return isRequestForSameUser;
  }

  getSlackUserFromSession = () => {
    let slackUser = StorageService.getSlackUser();
    if (this.props.isSignIn && slackUser == null) {
      this.handleError(new Error('Slack user not found!'));
      return;
    }
    return slackUser;
  }

  render() {
    const marginStyle = { marginTop: '1rem' };

    if (!this.props.isSignIn) {
      return <Redirect to='/signin' />;
    }
    if (!this.state.users)
      return (<div style={{ position: "absolute", top: "50%", left: "50%" }}><ReactLoading type="bars" color="#343a40" /><NotifyContainer /></div>);
    return (
      <div style={marginStyle}>
        <div className="input-group">
          <div className="row">
            <div className="col-sm-6 col-lg-5" style={marginStyle}>
              <label className="input-group-text">
                <span className="oi oi-person"></span> &nbsp;&nbsp;Select User:
                </label>
            </div>

            <NameSelectionComponent
              users={this.state.users}
              onChangeUserName={(name) => this.handleInUserNameChange(name)} />

            <DatePicker onDateChange={(datePeriod) => this.handleInDateChange(datePeriod)}
            />

          </div>

          <div style={{ width: '35rem' }}></div>
        </div>

        <TimeReportTable
          slackUser={this.getSlackUserFromSession()}
          data={this.state.timeReportData}
          showNewRow={this.state.showNewRow}
          onAdd={() => this.setState({ showNewRow: !this.state.showNewRow })}
          onChange={(change, action) => this.handleInTimeReportChange(change, action)}
        />

        <NotifyContainer />
      </div>
    );
  }
}






