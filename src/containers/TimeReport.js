import React, { Component } from 'react';
import NameSelectionComponent from '../components/NameSelectionComponent';
import DatePicker from '../components/DatePicker';
import TimeReportTable from '../components/TimeReportTable';
import LoaderComponent from '../components/LoaderComponent';
export default class TimeReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getUsers = () => fetch(API_ROOT + '/api/users').then(res => res.json());
  getTimeReport = (query) => fetch(
    API_ROOT + '/api/timereport',
    {
      method: 'POST',
      body: JSON.stringify(query),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());

  componentDidMount = () => this.getUsers().then(users => this.setState({ users: users }));
  handleInUserNameChange = (userName) => this.setState({ user: userName });


  handleInDateChange(datePeriod) {
    let query = {
      startDate: datePeriod.startDate,
      endDate: datePeriod.endDate,
      userName: this.state.user
    };
    this.getTimeReport(query)
      .then(data => this.setState({ timeReportData: data }))
      .catch(err => err);

  }

  render() {
    const marginStyle = { marginTop: '1rem' };
    if (!this.state.users)
      return (<LoaderComponent />);
    return (
      <div style={marginStyle}>
        <div className="selection-group">
          <NameSelectionComponent
            users={this.state.users}
            onChangeUserName={(name) => this.handleInUserNameChange(name)} />
          <DatePicker onDateChange={(datePeriod) => this.handleInDateChange(datePeriod)} />
        </div>
        <TimeReportTable data={this.state.timeReportData} />
      </div>
    );
  }
}
