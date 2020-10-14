import React from 'react';
import ReactPlayer from 'react-player';
import TypeCheckbox from './TypeCheckbox'
import ModeCheckbox from './ModeCheckbox'
import "../App.css";
import TimeInput from 'react-time-input';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox'


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
            <div style={{margin:"20px"}}>
                <div style={{marginTop:"10px"}}>
                    <h2 style={{alignContent:"center"}}>Data Input Tool</h2>
                </div>
                <div>
                    <input type='text' placeholder="Enter URL here" name='urlname' onChange={this.handleInputChange} style={{width:"90%"}}/>
                    <button onClick={()=> this.seturl()}>Load</button>
               
                <div style={{marginTop:"10px", marginBottom:"10px"}}>
                 <ReactPlayer width='700px' height='400px' controls url={this.state.url} />
                 </div>
                 </div>
                 <div>
                     <form noValidate autoComplete="off">
                        <div>
                        <label><b>Start & End time of the violent scene:</b></label>
                        <table style={{marginLeft:"280px"}}>
                            <tr>
                                <td>
                                <TimeInput 
                                    initTime='00:00'
                                    ref="TimeInputWrapper"
                                    className='form-control'
                                    mountFocus='true'
                                />
                                </td>
                                <td>
                                <TimeInput 
                                    initTime='00:00'
                                    ref="TimeInputWrapper"
                                    className='form-control'
                                    mountFocus='true'
                                />
                                </td>
                            </tr>
                        </table>
                        
                        {/* <input style={{padding:"2px", margin:"5px"}} type='text' placeholder='Start time' name='stTime'/>
                        <input style={{padding:"2px"}} type='text' placeholder='End time' name='endTime'/> */}
                        </div>
                         <div>
                             <div>
                             <label><b>Type of violence available:</b></label>
                             </div>
                             <div className="box-field">
                             <TypeCheckbox/>
                             </div>
                               
                        </div>     

                        <div>
                            <div>
                                <label><b>Violence Media:</b></label>
                            </div>
                            <div className="box-field">
                            <ModeCheckbox/>
                            </div>
                        </div> 
                        <div style={{marginLeft:"50%", marginTop:"10px"}}>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                        </div>
                     </form>  
                     
                                      
                 </div>
            </div>
        )
    }
}

export default VideoPlayer;