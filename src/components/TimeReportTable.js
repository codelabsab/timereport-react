import React, { Component } from 'react';
import './../styles/TimeReportTable.css';
export default class TimeReportTable extends Component {
    handleUserDelete(event, user){
        console.log(user);
    }
    render() {
        const data = this.props.data;
        const marginStyle = {
            marginTop: '1rem'
        };
        let table = [];
        if (data && data.length > 0)
            table.push(<table className="table">
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
                            <td><span className="type">{row.type_id}</span></td>
                            <td>{row.start}</td>
                            <td>{row.hours}</td>
                            <td>
                                <button className="btn btn-sm btn-warning" type="button">
                                    <span className="oi oi-pencil"></span>
                                </button>&nbsp;
                                <button className="btn btn-sm btn-danger" type="button" onClick={(e) => this.handleUserDelete(e, row)}>
                                    <span className="oi oi-trash"></span>
                                </button>
                            </td>
                        </tr>;
                    })}
                </tbody>
            </table>);
        return (
            <div className="table-data" style={marginStyle}>
                {table}
            </div>
        );
    }
}