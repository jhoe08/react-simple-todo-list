import React, { Component } from 'react';
import { connect } from 'react-redux';
import { goalCoach } from '../firebase';

class AddGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date:{
        createdAt: ''
      }
    }
    this.creationInterval = null;
  }

  componentDidMount() {
    this.tick();
  }
  componentWillUnmount() {
    if(this.creationInterval) {
      clearInterval(this.creationInterval);
    }
  }
  tick(){
    this.creationInterval = setInterval(() => {
      this.setState({
        date:{
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      })
    }, 1000);
  }

  setCreatedBy() {
    console.log('this', this);
    this.props.user.createdBy = this.props.user.email;
  }

  addGoal() {
    this.tick();
    this.setCreatedBy();
    const { title, date } = this.state;
    const { user } = this.props;

    if(user && title){
      goalCoach.push({ user, title, date });
      alert('Goals is successfully created!');
    } else {
      alert('The title field is empty!');
    }
  }

  render() {
    let button, label;
    button = <button
      className='btn btn-success'
      type='button'
      onClick={() => this.addGoal()}
    >
      Submit
    </button>;
    label = <i className="fa fa-align-right" aria-hidden="true" style={{position: 'absolute',left: '10px',color: '#555d6a', transform: 'rotate(180deg)',top: '7px'}}></i>
    button = <i
      className="fa fa-plus"
      aria-hidden="true"
      style={{position: 'absolute',top: '0',right: '0',color: '#ffffff',background: '#555d6a',padding: '9px 20px', cursor: 'pointer',borderTopRightRadius: '4px',borderBottomRightRadius: '4px'}}
      onClick={() => this.addGoal()}
      ></i>

    return(
      <div className='form-inline'>
        <div className='form-group' style={{position: 'relative'}}>
          {label}
          <input
            type='text'
            placeholder='Add a task...'
            className='form-control'
            style={{marginRight: '5px', paddingLeft: '35px', paddingRight: '60px'}}
            onChange={event => this.setState({title: event.target.value })}
          />
          {button}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  }
}

export default connect(mapStateToProps, null)(AddGoal);
