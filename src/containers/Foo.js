import { connect } from 'react-redux'
import * as TodoActions from '../actions'

import { bindActionCreators } from 'redux'
import TimeReport from '../containers/TimeReport';


const mapStateToProps = state => ({
    users: state.users,
})


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch)
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeReport)
