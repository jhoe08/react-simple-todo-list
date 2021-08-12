import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createdAt } from '../actions';

class GetDate extends Component {

  constructor(props){
    super(props);
    let newDate = new Date(); // Date Tue Aug 03 2021 10:19:11 GMT+0800 (Philippine Standard Time)
    let today = Date.now(); // 1627957151922
    this.state = {
      today: today,
      // createdAt: '',
      // date: newDate
    }

  }
  componentDidMount() {
    // let today = Date.now();
    // this.props.createdAt(today);
    // console.log('this.props was', this.props);
  }

  getPrevDate() {
    const today = this.state.today;
    const d = new Date(today);
    const nextDay = d.setDate(d.getDate() - 1);

    this.setState({ today: nextDay, date: nextDay })
  }
  getNextDate() {
    const today = this.state.today;
    const d = new Date(today);
    const nextDay = d.setDate(d.getDate() + 1);

    this.setState({ today: nextDay, date: nextDay })
  }

  displayCat() {
    return(
      <div className='datePicker-category'>
        <Link to='/day'>Day</Link>
        <Link to='/week'>Week</Link>
        <Link to='/month'>Month</Link>
        <Link to='/year'>Year</Link>
      </div>
    )
  }

  displayDay() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = this.state.today;
    const d = new Date(today);

    return(
      <div className='datePicker'>
        <div>
          <i onClick={() => this.getPrevDate()} className="fa fa-angle-left" aria-hidden="true"></i>
        </div>
        <div>
          <span className='daysNames'>{daysNames[d.getDay()]}</span>
          <small>{monthNames[d.getMonth()]} {d.getDay()+1}, {d.getFullYear()}</small>
        </div>
        <div>
          <i onClick={() => this.getNextDate()} className="fa fa-angle-right" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
  render() {

    let today = Date.now();
    // this.props.createdAt(today);

    console.log('this.props', this.props);

    return(
      <div>
        <div>{this.displayDay()}</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { date } = state;
  return {
    date
  }
}

export default connect(mapStateToProps, {createdAt})(GetDate);
