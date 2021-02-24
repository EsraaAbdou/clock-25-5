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
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
    };
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
        </div>
      </div>
    );
  }
}
export default App;
