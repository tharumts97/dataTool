import React from 'react';
import ReactPlayer from 'react-player';
import TypeCheckbox from './TypeCheckbox'
import ModeCheckbox from './ModeCheckbox'


class VideoPlayer extends React.Component{
    constructor(){
        super();
        this.state ={
            url:null,
            urlname:null
        }
        console.log("state-----",this.state.url)
    }

    seturl=(event)=>{
        this.setState({
            url:this.state.urlname
        })   
    }

    handleInputChange = (event)=>{
        event.preventDefault()
        this.setState({[event.target.name]:event.target.value})
    }
 
    render(){
        return(
            <div>
                <div>
                    <input type='text' placeholder="Enter URL here" name='urlname' onChange={this.handleInputChange}/>
                    <button onClick={()=> this.seturl()}>Load</button>
                </div>
                <br/>
                 <ReactPlayer width='480px' height='240px' controls url={this.state.url} />
                 <br/>
                 <div>
                     <form>
                     <table border='1px'>
                         <tr><td><label>Start & End time of the violent scene:</label></td></tr>
                         <tr>
                             <td><input type='text' placeholder='Start time' name='stTime'/></td>
                             <td><input type='text' placeholder='End time' name='endTime'/></td>
                         </tr>
                         <tr>
                             <td>Type of violence available</td>
                             <td>
                               <TypeCheckbox/>
                            </td>                                
                         </tr>
                         <tr>
                             <td>Violence Media</td>
                             <td><ModeCheckbox/></td>
                         </tr>
                     </table>  
                     </form>                   
                 </div>
            </div>
        )
    }
}

export default VideoPlayer;