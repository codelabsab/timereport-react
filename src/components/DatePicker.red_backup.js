
import React, { Component } from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
export default class DatePicker extends Component {
    constructor(props) {
        super(props);
    }
    handleDateChange(event, picker) {
        this.props.onDateChange({
            startDate: picker.startDate.format('YYYY-MM-DD') + 'T00:00:00Z',
            endDate: picker.endDate.format('YYYY-MM-DD') + 'T00:00:00Z',
        });
    }
    render() {
        const marginStyle = { marginTop: '1rem' };
        return (
            <div className="col-sm-12 col-lg-1" style={marginStyle}>
                <DateRangePicker onApply={(e, p) => this.handleDateChange(e, p)}>
                    <button type="button" className="btn btn-secondary">
                        <span className="oi oi-calendar"></span> &nbsp;&nbsp;Select Date
                </button>
                </DateRangePicker>
            </div>

        );
    }
}