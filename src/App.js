import "./styles.css";
import React, { Component } from "react";
import { find } from "lodash";
import tts from "./tts.png";

const synth = window.speechSynthesis;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voicelist: synth.getVoices(),
      value: ""
    };

    //To get voices in beg. by manually firing event
    synth.onvoiceschanged = () => {
      const voices = synth.getVoices();
      this.setState({ voicelist: voices });
    };

    this.speakfnc = this.speakfnc.bind(this);
    this.textchange = this.textchange.bind(this);
    this.langchng = this.langchng.bind(this);
  }

  getVoices = () => {
    this.setState({ voicelist: synth.getVoices() });
  };

  speakfnc() {
    console.log("speakfnc called");
    const speakText = new SpeechSynthesisUtterance(this.state.value);
    speakText.voice = this.state.currLang;
    synth.speak(speakText);
  }

  speakfnckey = (event) => {
    if (event.key === "Enter") {
      const speakText = new SpeechSynthesisUtterance(this.state.value);
      speakText.voice = this.state.currLang;
      synth.speak(speakText);
    }
  };

  stopfnc() {
    console.log("stopfnc called");
    synth.cancel();
  }

  textchange(event) {
    this.setState({ value: event.target.value });
  }

  langchng(event) {
    var langName = event.target.value;
    let currLang = find(this.state.voicelist, { name: langName });

    // console.log(currLang);

    this.setState({ currLang: currLang });
  }

  render() {
    // console.log(this.state.voicelist);
    return (
      <div className="parent">
        <h1 className="heading">Text-to-Speech Converter</h1>
        <img src={tts} className="img" alt="" />
        {/* Creating Drop Down Menu using State */}
        <select className="select" onChange={this.langchng}>
          {this.state.voicelist.map((item, index) => {
            // console.log(item);
            return <option key={`${index}_${item.name}`}> {item.name} </option>;
          })}
        </select>

        <textarea
          onKeyUp={this.speakfnckey}
          className="textarea"
          placeholder="Enter Text to Speak"
          onChange={this.textchange}
        ></textarea>

        <div className="btnparent">
          <button className="btn" onClick={this.speakfnc}>
            Speak
          </button>

          <button className="btn" onClick={this.stopfnc}>
            Stop
          </button>
        </div>
      </div>
    );
  }
}

export default App;
