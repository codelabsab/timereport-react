import { connect } from 'react-redux'
import DatePicker from '../components/DatePicker.red'
import { pickDate } from '../actions'


export default connect(null, { pickDate })(DatePicker)
