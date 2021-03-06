import React, { Component } from "react";
import "../App.css";

class App extends Component {
  state = {
    c1: false,
    c2: false,
    c3:false,
    c4:false
  };
  onChange = e=>{
    this.setState({[e.target.name] : e.target.checked});
  }

  render() {
    const{c1,c2,c3,c4}=this.state;
    return (
      <form>
      
        <label>
          <input
          type="checkbox"
          name="c1"
          checked={c1}
          onChange={this.onChange}
        />        
        Visual
        </label>
        <br/>
         <label>
         <input
         type="checkbox"
         name="c2"
         checked={c2}
         onChange={this.onChange}
       />
       Auditory
       </label>
       <br/>
         <label>
         <input
         type="checkbox"
         name="c3"
         checked={c3}
         onChange={this.onChange}
       />
       Conversation
       </label>
       
      {/* <h5>Is it Fighting? : {c1?"Yes":"No"}</h5>
      <h5>Is it Gunshot? : {c2?"Yes":"No"}</h5> */}

      </form>

    );
  }
}

export default App;