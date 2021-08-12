import React, { Component } from 'react';
import { firebase, listUsers } from '../firebase';
import { Link } from 'react-router-dom';
import logo from '../assets/to-do.png'

class SigUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signUp() {
    const { email, password } = this.state;
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() =>
      listUsers.push({ email })
    )
    .catch(error => {
      this.setState({error});
    })
  }

  render(){
    return (
      <div style={{width: '80vw',display: 'inline-block'}}>
        <div style={{display: 'inline-block', padding: '10px',backgroundColor: 'white',borderRadius: '80px', overflow:'hidden'}}>
          <img src={logo} alt='to-do' style={{width:'100px'}}/>
          <div className='noDisplay'>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
        <h1 className='header-title'>Sign Up!</h1>
        <div className='form-inline'>
          <input
            className='form-control'
            type='text'
            placeholder='email'
            onChange={event => this.setState({email:event.target.value})}
          />
          <input
            className='form-control'
            type='password'
            placeholder='password'
            onChange={event => this.setState({password:event.target.value})}
          />
          <button
            className='btn btn-primary'
            type='button'
            onClick={() => this.signUp()}
          >
            Sign Up
          </button>
        </div>
        <div><Link to='/signin'>Already have an account? Sign In</Link></div>
        <div>{this.state.error.message}</div>
      </div>
    )
  }
}

export default SigUp;
