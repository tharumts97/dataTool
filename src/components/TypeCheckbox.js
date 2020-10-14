import React, { Component } from "react";
import "../App.css";

class App extends Component {
  state = {
    c1: false,
    c2: false
  };
  onChange = e=>{
    this.setState({[e.target.name] : e.target.checked});
  }

  render() {
    const{c1,c2,c3,c4,c5}=this.state;
    return (
      <form>
      
        <label>
          <input
          className="inputchk"
          type="checkbox"
          name="c1"
          checked={c1}
          onChange={this.onChange}
        />
        Fighting
        </label>
        <br/>
         <label>
       
         <input
         type="checkbox"
         name="c2"
         checked={c2}
         onChange={this.onChange}
       />
         Gunshot
       </label>
       <br/>
         <label>
         <input
         type="checkbox"
         name="c3"
         checked={c3}
         onChange={this.onChange}
       />
        Bomb
       </label>
       <br/>
         <label>
         <input
         type="checkbox"
         name="c4"
         checked={c4}
         onChange={this.onChange}
       />
        Stabbing
       </label>
       <br/>
         <label>
         <input
         type="checkbox"
         name="c5"
         checked={c5}
         onChange={this.onChange}
       />
        Blood
       </label>

      {/* <h5>Is it Fighting? : {c1?"Yes":"No"}</h5>
      <h5>Is it Gunshot? : {c2?"Yes":"No"}</h5> */}

      </form>

    );
  }
}

export default App;