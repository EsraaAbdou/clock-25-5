import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function TimeInput(props){
  return (
    <div>
      <h4 id={props.labelID} className="mb-4 font-weight-bold">{props.label}</h4>
      <div>
        <span id={props.decID} onClick={()=>props.decrementTime(props.decID)}>
          <FontAwesomeIcon icon={faMinus} size="2x"/>
        </span>
        <label id={props.timeID} className="px-5 font-weight-bold" unselectable="on">{props.time}</label>
        <FontAwesomeIcon icon={faPlus} id={props.incID} onClick={()=>props.incrementTime(props.incID)} size="2x" />
      </div>
    </div>
  );
}
function Timer(props){
  return(
    <div>
      <div className="border border-white rounded d-inline-block w-100 w-responsive p-5 thicker-border">
        <h4 id="timer-label" className="py-3">{props.turn}</h4>
        <h3 id="time-left">{props.min.toString().length===2?"":"0"}{props.min}:{props.sec.toString().length===2?"":"0"}{props.sec}</h3>
      </div>
      <div className="p-4">
        <span id="start_stop" className="mr-2" onClick={props.toggleTimer}>start/stop</span>
        <span id="reset" className="ml-2" onClick={props.resetTimer}>reset</span>
      </div>
    </div>
  );
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minLeft: 25,
      secLeft: 0,
      timerStatus: false, 
      turn: true
    };
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
    this.incrementTime = this.incrementTime.bind(this);
  }

  resetTimer() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minLeft: 25,
      secLeft: 0,
      timerStatus: false,
      turn: true
    });
    clearInterval(this.state.timer);
    document.querySelector("audio").pause();
    document.querySelector("audio").currentTime = 0;
  }

  toggleTimer() {
    if(!this.state.timerStatus) {
      // turn on timer
      let timerInterval = setInterval(() => {
        // console.log(this.state.timerStatus)
        if(this.state.minLeft === 0 && this.state.secLeft === 1) document.querySelector("audio").play();
        if(this.state.secLeft>0){
          this.setState(state => {return{secLeft: state.secLeft-1}})
        }else if(this.state.minLeft>0){
          this.setState(state => {return {minLeft: state.minLeft-1, secLeft: 59}})
        } else {
          // If the count down is finished
          if(this.state.turn === true) {
            this.setState(state => {return {minLeft: state.breakLength, secLeft: 0, turn: false}});
          } else {
            this.setState(state => {return {minLeft: state.sessionLength, secLeft: 0, turn: true}});
          }
        }
      }, 1000);
      this.setState({timer: timerInterval});
    } else {
      // turn off timer
      clearInterval(this.state.timer);
    }
    this.setState(state => {return{ timerStatus: !state.timerStatus}})
  }

  decrementTime(params) {
    if(!this.state.timerStatus){
      if(params === "break-decrement") {
        if(this.state.breakLength>1) {
          if(!this.state.turn) {
            this.setState(state => { return{breakLength: state.breakLength - 1, minLeft: state.breakLength - 1, secLeft: 0}});
          } else {
            this.setState(state => { return{breakLength: state.breakLength - 1}});
          }
        }
      }
      if(params === "session-decrement"){
        if(this.state.sessionLength>1) {
          if(this.state.turn) {
            this.setState(state => { return{sessionLength: state.sessionLength - 1, minLeft: state.sessionLength - 1, secLeft: 0}});
          } else {
            this.setState(state => { return{sessionLength: state.sessionLength - 1}});
          }
        }   
      }
    }
  }

  incrementTime(params) {
    if(!this.state.timerStatus){
      if(params === "break-increment") {
        if(this.state.breakLength < 60) {
          if(!this.state.turn) {
            this.setState(state => { return{breakLength: state.breakLength + 1, minLeft: state.breakLength + 1, secLeft: 0}});
          } else {
            this.setState(state => { return{breakLength: state.breakLength + 1}});
          }
        }      
      }
      if(params === "session-increment"){
        if(this.state.sessionLength<60) {
          if(this.state.turn) {
            this.setState(state => { return{sessionLength: state.sessionLength + 1, minLeft: state.sessionLength + 1, secLeft: 0}});
          } else {
            this.setState(state => { return{sessionLength: state.sessionLength + 1}});
          }
        }  
      }
    }
  }

  render() {
    return(
      <div className="container text-center text-white">
        <audio id="beep">
          <source src="./assets/beeps.mp3" type="audio/mpeg" />
        </audio>
        <h1 className="p-5">25 + 5 Clock</h1>
        <div className="row">
          <div className="col-12 col-md-6 p-4">
            <TimeInput label="Break Length" labelID="break-label" time={this.state.breakLength} incID="break-increment" decID="break-decrement" timeID="break-length"
              decrementTime={this.decrementTime} incrementTime={this.incrementTime} />  
          </div>
          <div className="col-12 col-md-6 p-4">
            <TimeInput label="Session Length" labelID="session-label" time={this.state.sessionLength} incID="session-increment" decID="session-decrement"
              timeID="session-length" decrementTime={this.decrementTime} incrementTime={this.incrementTime} />
          </div>
          <div className="col-12 p-5">
            <Timer min={this.state.minLeft} sec={this.state.secLeft} timerStatus={this.state.timerStatus} turn={this.state.turn?"Session":"Break"}
              resetTimer={this.resetTimer} toggleTimer={this.toggleTimer} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
