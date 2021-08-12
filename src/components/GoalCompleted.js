import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalComplete } from '../firebase';
import { completedGoals } from '../actions';
import GoalItem from './GoalItem';


class GoalCompleted extends Component {
  componentDidMount() {
    goalComplete.on('value', snap=>{
      let completed =[];
      snap.forEach(goal => {
        const {user, title, date } = goal.val();
        const serverKey= goal.key;
        completed.push({ user, title, serverKey, date });
      });
      this.props.completedGoals(completed);
    });
  }

  clearAll() {
    goalComplete.set([]);
  }

  render() {
    return (
      <div className='todo-list completed'>
        <h2 className='noDisplay'>Completed</h2>
        {
          this.props.completed.map((goal, id) => {
            return (
              <GoalItem key={id} goal={goal} completed='true'/>
            )
          })
        }
        <button
          className='btn btn-primary'
          onClick={() => this.clearAll() }
        >
          Clear All Completed List
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { completed } = state;
  return {
    completed
  };
}

export default connect(mapStateToProps, {completedGoals})(GoalCompleted);
