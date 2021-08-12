import React, { Component } from "react";
import { connect } from 'react-redux';
import { firebase } from '../firebase';
import moment from 'moment';

class Popup extends Component {
  state = { descriptions: '', showPopUp: false };
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.setState({
      descriptions: this.props.data.descriptions,
      date: { dueDate: this.props.data.date.dueDate },
      title: this.props.data.title
    })
  }

  showCalendar = (event) => {
  }

  updateData = (props) => {
    const { title, user, date, serverKey } = this.props.data;
    const { updatedBy, createdBy, email } = user;
    const { createdAt } = date;

    console.log('this', this);

    try {
      firebase
      .database()
      .ref('/goalCoach/'+serverKey)
      .set({
        title: this.state.title,
        descriptions: this.state.descriptions,
        user: {
          updatedBy: this.props.user.email,
          email,
          createdBy
        },
        date: {
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
          createdAt,
          dueDate: (this.state.date.dueDate) ? this.state.date.dueDate : ''
        }
      });
    } catch (e) {
      alert(e);
    } finally {
      alert('Successfully updated the data' +serverKey)
    }
  }

  render = (props) => {
    const { data, handleClose } = this.props;
    const { user, title, descriptions, date } = data;
    const { createdBy } = user;
    const { createdAt, updatedAt, completedAt, dueDate } = date;
    return(
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={handleClose}><i className="fas fa-times-circle"></i></span>
          <div>
            <p>
              <label>{title}</label>
              <small style={{display: 'block', fontSize: 'small'}}>
                {(createdBy)?createdBy+' • ':''}
                {moment(new Date(createdAt)).fromNow()}
              </small>
            </p>
          </div>
          <div className='form-inline'>
            <div className='form-group'>
              <div className="mb-3">
                <label>Title</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Add the title...'
                  defaultValue={title}
                  onChange={event => this.setState({title: event.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <textarea
                  className="form-control"
                  placeholder='Add a descriptions...'
                  defaultValue={descriptions}
                  onChange={event => this.setState({descriptions: event.target.value })}>
                </textarea>
              </div>
              <div className="mb-3 row">
                <label>More Details</label>
                <div className="mb-3 col-md-6">
                  <label>Due Date</label>
                  <input
                    type='date'
                    className="form-control"
                    placeholder='Add the Due Date'
                    defaultValue={moment(dueDate).format('YYYY-MM-DD')}
                    // defaultValue={new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(dueDate)}
                    onChange={(event) => {
                      this.setState({ date:{
                        dueDate:new Date(event.target.value).getTime()
                      } }) }}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>Assign to</label>
                  <select className="form-control custom-select">
                    <option defaultValue="">Select a user to assign this task...</option>
                    <option defaultValue="1">One</option>
                    <option defaultValue="2">Two</option>
                    <option defaultValue="3">Three</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" onClick={() => this.updateData()}>Submit</button>
            </div>
          </div>
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

export default connect(mapStateToProps, null)(Popup);
