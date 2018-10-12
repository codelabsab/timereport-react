import React, { Component } from 'react';
import NameSelectionComponent from '../components/NameSelectionComponent';
import DatePicker from '../components/DatePicker';
import TimeReportTable from '../components/TimeReportTable';
import LoaderComponent from '../components/LoaderComponent';
import * as AuthService from '../services/AuthService';
import * as WebService from '../services/WebService';
import * as StorageService from '../services/StorageService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const toastConfig = {
  position: "top-right",
  autoClose: 7000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true
};

export default class TimeReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    StorageService.resetAccessToken();
    let verificationCode = AuthService.getVerificationCode(props.location.search);
    let accessTokenUrl = AuthService.getAccessTokenUrl(verificationCode);
    WebService.getAccessToken(accessTokenUrl)
      .then((response) => {
        if (AuthService.validateAccessToken(response)) {
          //use team_id instead of access_token
          StorageService.setAccessToken(response.team_id);
          this.getUsersAndDatePickers();
        }
      })
      .catch(this.handleError);
  }

  getUsersAndDatePickers = () => WebService.getUsers()
    .then(users => this.setState({ users: users }))
    .catch(this.handleError);

  handleError = (e) => {
    let errorMessage = 'Error : ' + (e.message || 'Error Occured');
    toast.error('🚨 ' + errorMessage, toastConfig);
  }
  handleInUserNameChange = (userName) => this.setState({ user: userName });

  handleInDateChange(datePeriod) {
    let query = {
      startDate: datePeriod.startDate,
      endDate: datePeriod.endDate,
      userName: this.state.user
    };
    WebService.getTimeReport(query)
      .then(data => this.setState({ timeReportData: data }))
      .catch(this.handleError);

  }

  render() {
    const marginStyle = { marginTop: '1rem' };
    if (!this.state.users)
      return (<div><ToastContainer /></div>);
    return (
      <div style={marginStyle}>
        <div className="input-group">
          <div className="input-group-prepend">
            <label className="input-group-text">
            <span class="oi oi-person"></span> &nbsp;&nbsp;Select User:
            </label>
          </div>
          <NameSelectionComponent
            users={this.state.users}
            onChangeUserName={(name) => this.handleInUserNameChange(name)} />
          <DatePicker onDateChange={(datePeriod) => this.handleInDateChange(datePeriod)} />
          <div style={{ width: '35rem' }}></div>
        </div>
        <TimeReportTable data={this.state.timeReportData} />
        <ToastContainer />
      </div>
    );
  }
}
