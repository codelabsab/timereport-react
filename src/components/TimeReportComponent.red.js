import React from 'react'
import Media from "react-media";
const moment = require('moment');
const MAX_WIDTH_EXTRA_SMALL_DEVICE_PX = 599;




//const data = this.props.data;
const showNewRow = false;
const marginStyle = {
    marginTop: '1rem',
    overflowX: 'auto'
};


const today = moment().format('YYYY-MM-DD');
const mediaMatches = false;


const TimeReportComponent = ({ timereportData }) => {

    const bottomBorderStyle = {
        marginBottom: "3rem",
        borderBottom: ".6rem solid rgb(27, 118, 196, .6)"
    };
    const noStyle = {};
    const showNewRow = false;
    const slackUser ={name: 'fooo'} 
    return (
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
                        <button onClick={(e) => 'this.handleUserAddRequest(e)'}
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
                            <input id="new_user_name" type="text" className="form-control" style={{ width: '10rem' }} name="user_name" defaultValue={slackUser.name} disabled></input>
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
                            <button onClick={(e) => 'this.handleUserAddDone(e)'} className="btn btn-sm btn-success" type="button">
                                <span className="oi oi-check"></span>
                            </button>
                        </td>
                    </tr>
                )}
                {
                    //timereportData && timereportData.length > 0 &&
                    timereportData.map((row) => {
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
                                        <button className="btn btn-sm btn-warning" type="button" onClick={(e) => 'this.handleUserEdit(e, row)'}>
                                            <span className="oi oi-pencil"></span>
                                        </button>
                                        <button className="btn btn-sm btn-danger" style={{ marginLeft: '.5rem' }} type="button" onClick={(e) => 'this.handleUserDelete(e, row)'}>
                                            <span className="oi oi-trash"></span>
                                        </button>
                                    </div>
                                )}
                                {row.editable && (
                                    <button onClick={(e) => 'this.handleUserEditDone(e, row)'} className="btn btn-sm btn-warning" type="button" >
                                        <span className="oi oi-check"></span>
                                    </button>
                                )}
                            </td>
                        </tr>;
                    })
                }
            </tbody>

        </table>
    )
}



export default TimeReportComponent