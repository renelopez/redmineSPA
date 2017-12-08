import React from 'react';
import connect from 'react-redux';
import {bindActionCreators} from 'redux';


class DashboardContainerComponent extends React.Component{
  render(){

  }
}

function mapStateToProps(state){
  return{
    //TODO Reselect Maybe
    projects:state.projects
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(actionCreators,dispatch);
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DashboardContainerComponent);
