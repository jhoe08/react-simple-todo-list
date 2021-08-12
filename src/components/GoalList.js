import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalCoach } from '../firebase';
import { setGoals, setUsers } from '../actions';
import GoalItem from './GoalItem';

class GoalList extends Component {
  componentDidMount() {
    goalCoach.on('value', snap=>{
      let goals =[];
      let users =[];
      snap.forEach(goal => {
        const {user, title, descriptions, date } = goal.val();
        const { email } = user;
        const serverKey= goal.key;
        goals.push({ user, title, descriptions, serverKey, date });
      });
      this.props.setGoals(goals);
    });
  }

  render() {
    return (
      <div className='todo-list list-group'>
        <h2 className='noDisplay'>Goal List</h2>
        {
          this.props.goals.map((goal, id) => {
            return (
              <GoalItem key={id} goal={goal} />
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { goals, users } = state;
  return {
    goals, users
  };
}

export default connect(mapStateToProps, { setGoals, setUsers })(GoalList);
