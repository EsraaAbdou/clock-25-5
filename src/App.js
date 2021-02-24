import React from 'react';
import './App.css';

function TimeInput(props){
  return (
    <div>
      <h4 id={props.labelID}>{props.label}</h4>
      <div>
        <button id={props.decID}>-</button>
        <label id={props.timeID}>{props.time}</label>
        <button id={props.incID}>+</button>
      </div>
    </div>
  );
}
function Timer(props){
  return(
    <div>
      <h4 id="timer-label">Session</h4>
      <h3 id="time-left">{props.min.toString().length===2?"":"0"}{props.min}:{props.sec.toString().length===2?"":"0"}{props.sec}</h3>
      <span id="start_stop" onClick={props.toggleTimer}>start/stop</span>
      <span id="reset" onClick={props.resetTimer}>reset</span>
    </div>
  );
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      minLeft: 0,
      secLeft: 10,
    };
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
  }

  resetTimer() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minLeft: 25,
      secLeft: 0,
    });
  }
  toggleTimer() {
    console.log("toggle timer function")
  }
  render() {
    return(
      <div className="container text-center">
        <h1>25 + 5 Clock</h1>
        <div className="row">
          <div className="col-12 col-md-5">
            <TimeInput label="Break Length" labelID="break-label" time={this.state.breakLength}
              incID="break-increment" decID="break-decrement" timeID="break-length"/>  
          </div>
          <div className="col-12 col-md-5">
            <TimeInput label="Session Length" labelID="session-label" time={this.state.sessionLength}
              incID="session-increment" decID="session-decrement" timeID="session-length"/>
          </div>
          <Timer min={this.state.minLeft} sec={this.state.secLeft}
            resetTimer={this.resetTimer} toggleTimer={this.toggleTimer} />
        </div>
      </div>
    );
  }
}
export default App;
