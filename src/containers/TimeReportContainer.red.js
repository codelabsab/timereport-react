import React from 'react'
import { connect } from 'react-redux'
import TimeReportComponent from '../components/TimeReportComponent.red'
import { getTimeReportData } from '../reducers'

const TimeReportContainer = ({ timereportData }) => (
    <TimeReportComponent
        //slackUser={slackUser}
        timereportData={timereportData}
    />
)

const mapStateToProps = (state) => ({
    //slackUser: getCartProducts(state),
    timereportData: getTimeReportData(state)
})
export default connect(mapStateToProps, { })(TimeReportContainer)
