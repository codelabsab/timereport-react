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
    const marginStyle = {
      marginRight: '.5rem'
    };
    return (
        <select
          title="Pick User"
          className="custom-select"
          style={marginStyle}
          onChange={e => this.handleUserNameChange(e)}>
          <option key={ALL_USER} value={ALL_USER} selected>All Users</option>
          {
            usersName.map(
              userName => <option key={userName} value={userName}>{userName}</option>
            )
          }
        </select>
    );
  }
}