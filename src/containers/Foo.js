import React, { Component } from 'react';
const ALL_USER = "all_users";
export default class NameSelectionComponent extends Component {
  constructor(props) {
    super(props);
    this.props.onChangeUserName(ALL_USER);
  }
  handleUserNameChange(event) {
    this.props.onChangeUserName(event.target.value);
  }
  render() {
    const usersName = this.props.users;
    const marginStyle = {};
    const marginStyle2 = { marginTop: '1rem' };
    return (
      <div className="col-sm-6 col-lg-5" style={marginStyle2}> 
          <select
            title="Pick User"
            className="custom-select"
            style={marginStyle}
            onChange={e => this.handleUserNameChange(e)}>
            <option key={ALL_USER} value={ALL_USER}>All Users</option>
            {
              usersName.map(
                userName => <option key={userName} value={userName}>{userName}</option>
              )
            }
          </select>
        </div>
    );
  }
}