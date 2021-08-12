import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebase } from '../firebase';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import GoalCompleted from './GoalCompleted';
import GetDate from './GetDate';

class App extends Component {
  componentWillUnmount(){
    this.setState({});
  }
  signOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>

        <h2 className='noDisplay'>Happy Coders!</h2>
        <AddGoal />
        <GoalList />
        <hr />
        <GoalCompleted />
        <button
          className='btn btn-danger'
          onClick={() => this.signOut()}
        >Sign Out
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, null)(App);
