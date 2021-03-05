function Timer(props){
    return(
      <div>
        <div className="border border-white rounded d-inline-block w-25 p-5 thicker-border">
          <h4 id="timer-label" className="py-3">{props.turn}</h4>
          <h3 id="time-left">{props.min.toString().length===2?"":"0"}{props.min}:{props.sec.toString().length===2?"":"0"}{props.sec}</h3>
        </div>
        <div class="p-4">
          <span id="start_stop" className="mr-2" onClick={props.toggleTimer}>start/stop</span>
          <span id="reset" className="ml-2" onClick={props.resetTimer}>reset</span>
        </div>
      </div>
    );
}

export default Timer;