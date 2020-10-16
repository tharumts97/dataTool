import React from 'react';
import ReactPlayer from 'react-player';
import TypeCheckbox from './TypeCheckbox'
import ModeCheckbox from './ModeCheckbox'
import "../App.css";
import TimeInput from 'react-time-input';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import Duration from './Duration';
import Axios from 'axios';


class Player extends React.Component {


    constructor() {
        super()
        this.state = {
            url: null,
            pip: false,
            playing: true,
            controls: false,
            light: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            startedTime: 0.00,
            endedTime: 0.00,
            markedStartedTime: false,
            markedEndedTime: false,
            isGoing: true,
            numberOfGuests: 2,
            violenceType: "Fighting",
            options: [{ id: "1", checked: true, label: "Visual", value: "Visual" }, { id: "2", checked: false, label: "Auditory", value: "Auditory" }, { id: "3", checked: false, label: "Conversation", value: "Conversation" }]
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);

    }

    // this.handleMarkedStartedTime = this.handleMarkedStartedTime.bind(this)
    // this.handleMarkedEndedTime = this.handleMarkedEndedTime.bind(this)

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRadioChange(event) {
        console.log(event.target.value)
        this.setState({
            violenceType: event.target.value
        });
        console.log(this.state.violenceType)
    }

    submit(){
        console.log(this.state.url)
        console.log(this.state.startedTime)
        console.log(this.state.endedTime)
        console.log(this.state.violenceType)
        console.log(this.state.options)

        const data = {
            url : this.state.url,
            startedTime: this.state.startedTime,
            endedTime:this.state.endedTime,
            violenceType: this.state.violenceType,
            mediaType: this.state.options
        }


        Axios.post('http://127.0.0.1:5000/collectdata', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) =>{
            console.log(res['data'])
            if(res['data']['status'] === true){
                window.alert("Data Collected Successfully...")
            }else{
                window.alert("Something Went Wrong...")
            }
        })
            .catch(function (error) {
                console.log(error);
            });


        


    }

    handleCheckboxChange(checked, option) {
        const { options } = this.state;

        var cOptions = [...options];
        for (var i in cOptions) {
            if (cOptions[i].id == option.id) {
                cOptions[i].checked = checked;
            }
        }
        this.setState({
            options: cOptions
        }, () => console.log(options));
    }

    format(seconds) {
        const date = new Date(seconds * 1000)
        const hh = date.getUTCHours()
        const mm = date.getUTCMinutes()
        const ss = this.pad(date.getUTCSeconds())
        if (hh) {
            return `${hh}:${this.pad(mm)}:${ss}`
        }
        return `${mm}:${ss}`
    }

    pad(string) {
        return ('0' + string).slice(-2)
    }



    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        })
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleMarkedStartedTime(duration, played) {
        console.log(duration, played)
        var time = this.format(Math.round(duration * played))
        this.setState({ startedTime: time, markedStartedTime: true, markedEndedTime: false })
    }

    handleMarkedEndedTime(duration, played) {
        console.log(duration, played)
        var time = this.format(Math.round(duration * (1 - played)))
        this.setState({ endedTime: time, markedEndedTime: true, markedStartedTime: false })
    }

    handleStop = () => {
        this.setState({ url: null, playing: false })
    }

    handleToggleControls = () => {
        const url = this.state.url
        this.setState({
            controls: !this.state.controls,
            url: null
        }, () => this.load(url))
    }

    handleToggleLight = () => {
        this.setState({ light: !this.state.light })
    }

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
    }

    handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }

    handleSetPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
    }

    handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
    }

    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    handleEnablePIP = () => {
        console.log('onEnablePIP')
        this.setState({ pip: true })
    }

    handleDisablePIP = () => {
        console.log('onDisablePIP')
        this.setState({ pip: false })
    }

    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }

    handleClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
    }

    renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(url)}>
                {label}
            </button>
        )
    }

    ref = player => {
        this.player = player
    }

    render() {
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
        const SEPARATOR = ' · '

        return (
            <div className='app'>
                <section className='section'>
                    <h1>Data Tool</h1>
                    <div className='player-wrapper'>
                        <ReactPlayer
                            ref={this.ref}
                            className='react-player'
                            width='100%'
                            height='100%'
                            url={url}
                            pip={pip}
                            playing={playing}
                            controls={controls}
                            light={light}
                            loop={loop}
                            playbackRate={playbackRate}
                            volume={volume}
                            muted={muted}
                            onReady={() => console.log('onReady')}
                            onStart={() => console.log('onStart')}
                            onPlay={this.handlePlay}
                            onEnablePIP={this.handleEnablePIP}
                            onDisablePIP={this.handleDisablePIP}
                            onPause={this.handlePause}
                            onBuffer={() => console.log('onBuffer')}
                            onSeek={e => console.log('onSeek', e)}
                            onEnded={this.handleEnded}
                            onError={e => console.log('onError', e)}
                            onProgress={this.handleProgress}
                            onDuration={this.handleDuration}
                        />
                    </div>
                    <h3>Marked Start Time : {this.state.startedTime}</h3>
                    <h3>Marked End Time : {this.state.endedTime}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Controls</th>
                                <td>

                                    <button onClick={this.handleStop}>Stop</button>
                                    <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                                    <button onClick={() => this.handleMarkedStartedTime(duration, played)}>{this.state.markedStartedTime ? this.state.startedTime : 'Mark Start Time'}</button>
                                    <button onClick={() => this.handleMarkedEndedTime(duration, played)}>{this.state.markedEndedTime ? this.state.endedTime : 'Mark End Time'}</button>
                                    <button onClick={this.handleClickFullscreen}>Fullscreen</button>
                                    {light &&
                                        <button onClick={() => this.player.showPreview()}>Show preview</button>}
                                    {ReactPlayer.canEnablePIP(url) &&
                                        <button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
                                </td>
                            </tr>
                            <tr>
                                <th>Speed</th>
                                <td>
                                    <button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                                    <button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
                                    <button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                                </td>
                            </tr>
                            <tr>
                                <th>Seek</th>
                                <td>
                                    <input
                                        type='range' min={0} max={0.999999} step='any'
                                        value={played}
                                        onMouseDown={this.handleSeekMouseDown}
                                        onChange={this.handleSeekChange}
                                        onMouseUp={this.handleSeekMouseUp}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>Volume</th>
                                <td>
                                    <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor='controls'>Controls</label>
                                </th>
                                <td>
                                    <input id='controls' type='checkbox' checked={controls} onChange={this.handleToggleControls} />
                                    <em>&nbsp; Requires player reload</em>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor='muted'>Muted</label>
                                </th>
                                <td>
                                    <input id='muted' type='checkbox' checked={muted} onChange={this.handleToggleMuted} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor='loop'>Loop</label>
                                </th>
                                <td>
                                    <input id='loop' type='checkbox' checked={loop} onChange={this.handleToggleLoop} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label htmlFor='light'>Light mode</label>
                                </th>
                                <td>
                                    <input id='light' type='checkbox' checked={light} onChange={this.handleToggleLight} />
                                </td>
                            </tr>
                            <tr>
                                <th>Played</th>
                                <td><progress max={1} value={played} /></td>
                            </tr>
                            <tr>
                                <th>Loaded</th>
                                <td><progress max={1} value={loaded} /></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className='section'>
                    <table>
                        <tbody>
                            {/* <tr>
                    <th>Files</th>
                    <td>
                      {this.renderLoadButton('https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4', 'mp4')}
                      {this.renderLoadButton('https://test-videos.co.uk/vids/bigbuckbunny/webm/vp8/360/Big_Buck_Bunny_360_10s_1MB.webm', 'webm')}
                      {this.renderLoadButton('https://filesamples.com/samples/video/ogv/sample_640x360.ogv', 'ogv')}
                      {this.renderLoadButton('https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3', 'mp3')}
                      <br />
                      {this.renderLoadButton('https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8', 'HLS (m3u8)')}
                      {this.renderLoadButton('http://dash.edgesuite.net/envivio/EnvivioDash3/manifest.mpd', 'DASH (mpd)')}
                    </td>
                  </tr> */}
                            <tr>
                                <th>Custom URL</th>
                                <td>
                                    <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                                    <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Playing Data</h2>

                    <table>
                        <tbody>
                            <tr>
                                <th>url</th>
                                <td className={!url ? 'faded' : ''}>
                                    {(url instanceof Array ? 'Multiple' : url) || 'null'}
                                </td>
                            </tr>
                            <tr>
                                <th>playing</th>
                                <td>{playing ? 'true' : 'false'}</td>
                            </tr>
                            <tr>
                                <th>volume</th>
                                <td>{volume.toFixed(3)}</td>
                            </tr>
                            <tr>
                                <th>played</th>
                                <td>{played.toFixed(3)}</td>
                            </tr>
                            <tr>
                                <th>loaded</th>
                                <td>{loaded.toFixed(3)}</td>
                            </tr>
                            <tr>
                                <th>duration</th>
                                <td><Duration seconds={duration} /></td>
                            </tr>
                            <tr>
                                <th>elapsed</th>
                                <td><Duration seconds={duration * played} /></td>
                            </tr>
                            <tr>
                                <th>remaining</th>
                                <td><Duration seconds={duration * (1 - played)} /></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <div>
                    <form>
                        <br />
                        <label>
                        <b> Type of violence available:</b>
                        </label>

                        <div>
                            <div check>
                                <input
                                    type="radio"
                                    value="Fighting"
                                    checked={this.state.violenceType === "Fighting"}
                                    onChange={this.handleRadioChange}
                                />
                                <span
                                    style={{ marginLeft: "5px" }}
                                >Fighting</span>
                            </div>
                            <div check>
                                <input
                                    type="radio"
                                    value="GunShot"
                                    checked={this.state.violenceType === "GunShot"}
                                    onChange={this.handleRadioChange}
                                />
                                <span style={{ marginLeft: "5px" }}>GunShot</span>
                            </div>
                            <div check>
                                <input
                                    type="radio"
                                    value="Bomb"
                                    checked={this.state.violenceType === "Bomb"}
                                    onChange={this.handleRadioChange}
                                />
                                <span style={{ marginLeft: "5px" }}>Bomb</span>
                            </div>
                            <div check>
                                <input
                                    type="radio"
                                    value="Stabbing"
                                    checked={this.state.violenceType === "Stabbing"}
                                    onChange={this.handleRadioChange}
                                />
                                <span style={{ marginLeft: "5px" }}>Stabbing</span>
                            </div>
                            <div check>
                                <input
                                    type="radio"
                                    value="Blood"
                                    checked={this.state.violenceType === "Blood"}
                                    onChange={this.handleRadioChange}
                                />
                                <span style={{ marginLeft: "5px" }}>Blood</span>
                            </div>
                        </div>
                        <div>
                        <label><b>Violence Media:</b></label>
                            {
                                this.state.options.map(option => {
                                    return (
                                        <CheckboxField key={option.id} checked={option.checked} label={option.label} onChange={value => this.handleCheckboxChange(value, option)} />
                                    )
                                })
                            }
                        </div>

                    </form>

                    <div style={{marginLeft:"50%", marginTop:"10px"}}>
                        <Button onClick={this.submit.bind(this)} variant="contained" color="primary">
                            Submit
                        </Button>
                        </div>

                </div>
            </div>
        )
    }

}

export default Player;


const CheckboxField = ({ checked, onChange, label }) => {
    return (
        <div>
                                    <label>
                           {label}
                        </label>
            <input type="checkbox" checked={checked} onChange={ev => onChange(ev.target.checked)} />
        </div>
    );
};