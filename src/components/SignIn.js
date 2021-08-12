import React, { Component } from 'react';
import { firebase } from '../firebase';
import { Link } from 'react-router-dom';
import logo from '../assets/to-do.png'

class SigIn extends Component {
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

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }


  signIn() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
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
        <h1 className='header-title'>Sign In!</h1>
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
            onClick={() => this.signIn()}
          >
            Sign In
          </button>
        </div>
        <div className='sign-in-up'><Link to='/signup'>Don't have an account? Sign Up</Link></div>
        <div>{this.state.error.message}</div>
      </div>
    )
  }
}

export default SigIn;
