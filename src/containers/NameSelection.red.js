import { connect } from 'react-redux'
import NameSelection from '../components/NameSelection.red'
import { setUser } from '../actions'
import { getUsers } from '../reducers'


const mapStateToProps = (state) => ({
    usersName: getUsers(state),
})

export default connect(mapStateToProps, { setUser })(NameSelection)



