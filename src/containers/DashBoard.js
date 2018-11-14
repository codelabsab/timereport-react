import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import NameSelectionComponent from '../components/NameSelectionComponent';
import DatePicker from '../components/DatePicker';
import TimeReportTable from '../components/TimeReportTable';
import * as WebService from '../services/WebService';
import * as StorageService from '../services/StorageService';
import * as TimeReportBuildService from '../services/TimeReportBuildService';
import { NotifyContainer, NotifyService } from '../services/NotifyService';
import ReactLoading from "react-loading";
import * as TimeReportValidator from '../services/TimeReportDatavalidationService';

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.getUsersAndDatePickers();
    this.state = { timeReportData: [] };
  }
  componentDidMount() {
    console.log('componentDidMount');
  }
  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
  }

  getUsersAndDatePickers = () => WebService.getUsers()
    .then(users => this.setState({ users: users }))
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
    WebService.getTimeReport(query)
      .then(data => this.setState({ timeReportData: TimeReportBuildService.buildTimeReportData(data) }))
      .catch(this.handleError);
  }

  handleInTimeReportChange(change, action) {
    if (action === 'ADD') {
      if (!this.validateInput(change)) {
        this.handleError(new Error('Invalid data!'));
        return;
      }

      let timeReportToCreate = {
        user_id: change.user_id,
        user_name: change.user_name,
        type_id: change.type_id,
        start: change.start,
        hours: parseInt(change.hours),
      };
      WebService.createTimeReport(timeReportToCreate)
        .then(newUser => {
          let newUserBuild = TimeReportBuildService.buildTimeReportSingle(newUser);
          let timeReportDataWithAddedUser = this.state.timeReportData.concat([newUserBuild]);
          this.setState({ timeReportData: timeReportDataWithAddedUser });
        })
        .catch(this.handleError);
    }

    if (action === 'DELETE') {
      let timeReportDataExceptDeleted = this.state.timeReportData.filter(t => t.id !== change.id);
      WebService.deleteTimeReport(change)
        .then(response => this.setState({ timeReportData: timeReportDataExceptDeleted }))
        .catch(this.handleError);

    }

    if (action === 'EDIT') {
      let timeReportMapped = this.state.timeReportData.map(t => {
        if (t.id === change.id)
          t.setEditable(true);
        return t;
      });
      this.setState({ timeReportData: timeReportMapped });
    }

    if (action === 'EDIT_DONE') {
      if (!this.validateInput(change)) {
        this.handleError(new Error('Invalid data!'));
        return;
      }
      let timeReportMapped = this.state.timeReportData.map(t => {
        if (t.id === change.id) {
          t.setEditable(false);
          t.type_id = change.type_id;
          t.start = change.start;
          t.hours = parseInt(change.hours);
        }
        return t;
      });

      WebService.updateTimeReport(change)
        .then(response => this.setState({ timeReportData: timeReportMapped }))
        .catch(this.handleError);

    }
  }

  validateInput = (input) => (input.type_id.length > 0 && TimeReportValidator.validateDate(input.start) && TimeReportValidator.validateHour(input.hours));

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






