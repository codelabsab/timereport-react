import React, { Component } from 'react';
import './../styles/TimeReportTable.css';
export default class TimeReportTable extends Component {
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => {
                        return <tr>
                            <td>{row.user_name}</td>
                            <td><span className="type">{row.type_id}</span></td>
                            <td>{row.start}</td>
                            <td>{row.hours}</td>
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