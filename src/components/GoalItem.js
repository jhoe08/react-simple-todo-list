import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { goalCoach, goalComplete } from '../firebase';
import { completedAt } from '../actions';
import Popup from './Popup';

class GoalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showMore: false,
        showPopUp: false,
        showTooltip: false
    }
  }

  componentDidMount() {
    // this.completedDetails();
  }

  completedDetails(){
    this.props.goal.date.completedAt = Date.now()
    this.props.goal.user.completedBy = this.props.user.email;
  }

  completeGoal() {
    this.completedDetails();
    const { title, descriptions, serverKey, date, user } = this.props.goal;
    if( goalComplete.push({ user, title, descriptions, date }) ){
        // goalCoach.child(serverKey).remove();
        alert('Goal completed...')
    } else {
      alert('Something wrong with the system.');
    }
  }
  pinToTop = () => {
    console.log('this');
  }

  toggleOptions = () => {}

  togglePopup = () => {
    this.setState({
      showPopUp:!this.state.showPopUp,
      showMore:!this.state.showMore
    });
  }

  toggleShowMore = (show) => {
    this.setState({
      // showMore:!this.state.showMore
      showMore: show
    });
  }

  tooltip = () => {
    this.setState({
      showTooltip:!this.state.showTooltip
    });
  }

  remove() {
    const { title, serverKey } = this.props.goal;
    if(this.props.completed) {
        goalComplete.child(serverKey).remove();
    } else {
        goalCoach.child(serverKey).remove();
    }
    alert('Successfully deleted!');
  }

  displayDate(setDate) {
    const d = new Date(setDate);
    const month = (d.getMonth()+1).length > 1 ? (d.getMonth()+1) : "0" + (d.getMonth()+1);
    const day = (d.getDate()).length > 1 ? d.getDate() : "0" + d.getDate();
    const year = d.getFullYear();

    const hours = d.getHours() > 9 ? d.getHours() : "0" + d.getHours();
    const minutes = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
    const seconds = d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds();

    return month +"/"+ day +"/"+ year +" @"+ hours +":"+ minutes +":"+ seconds;
  }

  render(){
    const { user, title, descriptions, serverKey, date } = this.props.goal;
    const { createdAt, completedAt, dueDate } = date;
    const { createdBy, completedBy, updatedBy } = user;

    let className = 'far fa-square';
    let who = createdBy;
    let button = <span onClick={() => this.togglePopup()}><i className="fas fa-sticky-note"></i> Add memo</span>;
    let status = <span>edited by {updatedBy}</span>;
    let statusData = <span> • <i className="fas fa-calendar-alt" style={{marginRight: '5px'}}></i>{moment(dueDate).fromNow()}</span>;

    if(this.props.completed) {
      className = 'far fa-check-square';
      who = completedBy;
      button = <span onClick={() => console.log('Still developing...')}><i className="fas fa-eye"></i> View Goal</span>;
      status = <span>completed by {completedBy}</span>;
      statusData = <span> • <i className="fas fa-calendar-alt" style={{marginRight: '5px'}}></i>{moment(completedAt).fromNow()}</span>;
    }

    return(
      <div className="list-group">
        <div className="list-group-item list-group-item-action flex-column align-items-start" style={{color: 'inherit', backgroundColor:'inherit'}}>
          <div className="d-flex w-100 justify-content-between">
            <small>
              <span onClick={() => this.completeGoal()}><i className={className} style={{marginRight: '5px'}}></i></span>
            </small>
            <h5 className="mb-1" style={{flex: '1 0 0'}}>
              {title}
              {(updatedBy) ? <small style={{fontSize: '12px',display: 'block',fontFamily: 'RobotoCondensed'}}>
                {statusData}
              </small>:''}
            </h5>
            <small>
              <small style={{fontSize: 'small', verticalAlign: 'text-bottom'}}>
                {moment(new Date(createdAt)).fromNow()}
                {(who)?
                <em style={{verticalAlign: 'middle', marginLeft: '10px', position: 'relative'}}>
                  {(this.state.showTooltip) ?
                    <span className='custom-tooltip'>{who}</span>
                  :''}
                  <span onMouseEnter={() => this.tooltip(true)} onMouseLeave={() => this.tooltip(false)} data-tooltip="Default tooltip">
                    <i className="fas fa-user-circle" style={{fontSize: '20px'}}></i>
                  </span>
                </em>
              :''}
              </small>
              <span onClick={() => this.toggleShowMore(true)} onMouseLeave={() => this.toggleShowMore(false)}>
                <i className="fas fa-ellipsis-h" style={{padding: '9px 20px', cursor: 'pointer'}}></i>
                {(this.state.showMore) ?
                    <div className='showMore'>
                      <span onClick={() => this.pinToTop()}><i className="fas fa-thumbtack"></i> Pin on the top</span>
                      {button}
                      <span onClick={() => this.remove()}><i className="fas fa-trash"></i> Delete</span>
                    </div>
                :''}
              </span>
            </small>
          </div>
          { (descriptions) ?
              <p className="mb-1" style={{fontSize: 'small'}}>{descriptions}</p>
          : '' }
        </div>
        <div>{ this.state.showPopUp ? <Popup data={this.props.goal} handleClose={() => this.togglePopup()}/> : '' }</div>
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

export default connect(mapStateToProps, { completedAt  })(GoalItem);
