import React, { Component } from 'react';
import './../styles/TimeReportTable.css';
export default class TimeReportTable extends Component {
    constructor(props) {
        super(props);
    }
    handleUserEditDone(event, user) {
        this.props.onChange(user, 'EDIT');
    }

    handleUserDelete(event, user) {
        if (confirm('Are you sure to delete?')) {
            this.props.onChange(user, 'DELETE');
        }
    }
    handleUserEdit(event, user) {
        this.props.onChange(user, 'EDIT');
    }
    render() {
        const data = this.props.data;
        const marginStyle = {
            marginTop: '1rem'
        };
        let table = <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>User Name</th>
                    <th>Type Id</th>
                    <th>Start</th>
                    <th>Hours</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        if (data && data.length > 0)
            table = <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>User Name</th>
                        <th>Type Id</th>
                        <th>Start</th>
                        <th>Hours</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => {
                        return <tr>
                            <td>{row.user_name}</td>
                            <td>
                                {!row.editable && (
                                    <span className="type">{row.type_id}</span>
                                )}
                                {row.editable && (
                                    <input type="text" style={{ width: '10rem' }} name="hours" defaultValue={row.type_id}></input>
                                )}
                            </td>
                            <td>
                                {!row.editable && (
                                    <span>{row.start}</span>
                                )}
                                {row.editable && (
                                    <input type="text" style={{ width: '6rem' }} name="hours" defaultValue={row.start}></input>
                                )}
                            </td>
                            <td>
                                {!row.editable && (
                                    <span>{row.hours}</span>
                                )}
                                {row.editable && (
                                    <input type="text" style={{ width: '2rem' }} name="hours" defaultValue={row.hours}></input>
                                )}
                            </td>
                            <td>
                                {!row.editable && (
                                    <span>
                                        <button className="btn btn-sm btn-warning" type="button" onClick={(e) => this.handleUserEdit(e, row)}>
                                            <span className="oi oi-pencil"></span>
                                        </button>
                                        <button className="btn btn-sm btn-danger" style={{ marginLeft: '.5rem' }} type="button" onClick={(e) => this.handleUserDelete(e, row)}>
                                            <span className="oi oi-trash"></span>
                                        </button>
                                    </span>
                                )}
                                {row.editable && (
                                    <button className="btn btn-sm btn-warning" type="button" onClick={(e) => this.handleUserEditDone(e, row)}>
                                        <span className="oi oi-check"></span>
                                    </button>
                                )}
                            </td>
                        </tr>;
                    })}
                </tbody>
            </table>
        return (
            <div className="table-data" style={marginStyle}>
                {table}
            </div>
        );
    }
}