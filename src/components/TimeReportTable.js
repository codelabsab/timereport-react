import React, { Component } from 'react';
import './../styles/TimeReportTable.css';
import Media from "react-media";
const moment = require('moment');
const MAX_WIDTH_EXTRA_SMALL_DEVICE_PX = 599;
import * as TimeReportAction from '../constants/ActionTypes';

export default class TimeReportTable extends Component {
    constructor(props) {
        super(props);
    }

    handleUserAddRequest = (event) => this.props.onAdd();

    handleUserAddDone = (event) => {
        let addedUser = this.getUserAddChange();
        this.props.onChange(addedUser, TimeReportAction.ADD);
        this.props.onAdd();
    }

    handleUserEditDone = (event, user) =>
        this.props.onChange(this.getUserEditChange(user.id), TimeReportAction.EDIT_DONE);

    handleUserDelete = (event, user) => {
        if (confirm('Are you sure to delete?'))
            this.props.onChange(user, TimeReportAction.DELETE);
    }

    handleUserEdit = (event, user) => this.props.onChange(user, TimeReportAction.EDIT);

    getUserEditChange = (id) =>
        ({
            id: id,
            type_id: document.getElementById('type_id' + id).value,
            start: document.getElementById('start' + id).value,
            hours: document.getElementById('hours' + id).value,
        })

    getUserAddChange = () =>
        ({
            user_id: this.props.slackUser.id,
            user_name: this.props.slackUser.name,
            type_id: document.getElementById('new_type_id').value,
            start: document.getElementById('new_start').value,
            hours: document.getElementById('new_hours').value,
        })

    render() {
        const data = this.props.data;
        const showNewRow = this.props.showNewRow;
        const marginStyle = {
            marginTop: '1rem',
            overflowX: 'auto'
        };
        const bottomBorderStyle = {
            marginBottom: "3rem",
            borderBottom: ".6rem solid rgb(27, 118, 196, .6)"
        };
        const noStyle = {};
        const today = moment().format('YYYY-MM-DD');

        let table = <Media query={{ maxWidth: MAX_WIDTH_EXTRA_SMALL_DEVICE_PX }}>
            {mediaMatches =>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>{mediaMatches ? 'User' : 'User Name'}</th>
                            <th>{mediaMatches ? 'Type' : 'Type Id'}</th>
                            <th>Start</th>
                            <th>Hours</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody style={mediaMatches ? bottomBorderStyle : noStyle}>
                        <tr>
                            <td>
                                <button onClick={(e) => this.handleUserAddRequest(e)}
                                    style={{ marginLeft: '.5rem' }}
                                    type="button"
                                    className="btn btn-clear">
                                    <span className="oi oi-plus"></span>&nbsp;&nbsp;Add New
                        </button>
                            </td>
                        </tr>
                        {showNewRow && (
                            <tr>
                                <td>
                                    <input id="new_user_name" type="text" className="form-control" style={{ width: '10rem' }} name="user_name" defaultValue={this.props.slackUser.name} disabled></input>
                                </td>
                                <td>
                                    <input id="new_type_id" type="text" className="form-control" style={{ width: '10rem', background: 'floralwhite' }} name="type_id" ></input>
                                </td>
                                <td>
                                    <input id="new_start" type="text" className="form-control" style={{ width: '7rem', background: 'floralwhite' }} name="start" defaultValue={today} ></input>
                                </td>
                                <td>
                                    <input id="new_hours" type="text" className="form-control" style={{ width: '3rem', background: 'floralwhite' }} name="hours" ></input>
                                </td>
                                <td>
                                    <button onClick={(e) => this.handleUserAddDone(e)} className="btn btn-sm btn-success" type="button">
                                        <span className="oi oi-check"></span>
                                    </button>
                                </td>
                            </tr>
                        )}
                        {
                            data && data.length > 0 &&
                            data.map((row) => {
                                return <tr key={row.id}>
                                    <td>{row.user_name}</td>
                                    <td>
                                        {!row.editable && (
                                            <span className="type">{row.type_id}</span>
                                        )}
                                        {row.editable && (
                                            <input id={'type_id' + row.id} type="text" className="form-control" style={{ width: '10rem', background: 'floralwhite' }} name="type_id" defaultValue={row.type_id}></input>
                                        )}
                                    </td>
                                    <td>
                                        {!row.editable && (
                                            <div style={{ width: '7rem' }} >{row.start}</div>
                                        )}
                                        {row.editable && (
                                            <input id={'start' + row.id} type="text" className="form-control" style={{ width: '7rem', background: 'floralwhite' }} name="start" defaultValue={row.start}></input>
                                        )}
                                    </td>
                                    <td>
                                        {!row.editable && (
                                            <span>{row.hours}</span>
                                        )}
                                        {row.editable && (
                                            <input id={'hours' + row.id} type="text" className="form-control" style={{ width: '3rem', background: 'floralwhite' }} name="hours" defaultValue={row.hours}></input>
                                        )}
                                    </td>
                                    <td>
                                        {!row.editable && (
                                            <div style={{ width: '5rem' }}>
                                                <button className="btn btn-sm btn-warning" type="button" onClick={(e) => this.handleUserEdit(e, row)}>
                                                    <span className="oi oi-pencil"></span>
                                                </button>
                                                <button className="btn btn-sm btn-danger" style={{ marginLeft: '.5rem' }} type="button" onClick={(e) => this.handleUserDelete(e, row)}>
                                                    <span className="oi oi-trash"></span>
                                                </button>
                                            </div>
                                        )}
                                        {row.editable && (
                                            <button onClick={(e) => this.handleUserEditDone(e, row)} className="btn btn-sm btn-warning" type="button" >
                                                <span className="oi oi-check"></span>
                                            </button>
                                        )}
                                    </td>
                                </tr>;
                            })
                        }
                    </tbody>

                </table>
            }
        </Media>
        return (
            <div className="table-data" style={marginStyle}>
                {table}
            </div>
        );
    }
}