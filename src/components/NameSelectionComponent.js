import React, { Component } from 'react';
export default class NameSelectionComponent extends Component {
  constructor(props) {
    super(props);
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
      <select type="button"
        className="btn btn-secondary"
        style={marginStyle}
        onChange={(e) => this.handleUserNameChange(e)}>
        <option value="" defaultValue disabled hidden>Select User</option>
        {usersName.map((userName) => <option key={userName} value={userName}>{userName}</option>)}
      </select>
    );
  }
}