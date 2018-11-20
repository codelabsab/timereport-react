import React from 'react'
import PropTypes from 'prop-types'
import DateRangePicker from 'react-bootstrap-daterangepicker';

const DatePicker = ({ pickDate }) => (

    <div className="col-sm-12 col-lg-1" style={{ marginTop: '1rem' }}>
        <DateRangePicker
            onApply={(e, p) =>
                pickDate(
                    p.startDate.format('YYYY-MM-DD') + 'T00:00:00Z',
                    p.endDate.format('YYYY-MM-DD') + 'T00:00:00Z',
                )
            }>
            <button type="button" className="btn btn-secondary">
                <span className="oi oi-calendar"></span> &nbsp;&nbsp;Select Date
                </button>
        </DateRangePicker>
    </div>
)

DatePicker.propTypes = {
    pickDate: PropTypes.func.isRequired,
}

export default DatePicker