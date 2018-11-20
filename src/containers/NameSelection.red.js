import { connect } from 'react-redux'
import NameSelection from '../components/NameSelection.red'
import { selectUser } from '../actions'
import { getUsers } from '../reducers'


const mapStateToProps = (state) => ({
    users: getUsers(state),
})

export default connect(mapStateToProps, { selectUser })(NameSelection)



