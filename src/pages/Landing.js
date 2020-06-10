import React, { useState, useEffect, Component } from 'react';
import InputBox from '../components/InputBox';
import SentimentOutput from '../components/SentimentOutput';
import '../styles/Landing.css';



class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTweetUrl: "",
            result: "unknown"
        };
    };

    setTweetUrl = (userInput) => {
        this.setState({currentTweetUrl: userInput, result: "happy"})
        //alert('parent: ' + this.state.result);
    }

    render(){
        return (
            <div className="fill">
                <h1 className="appTitle">Sentiment Analysis</h1>
                <div className="contentBody">
                    <InputBox passDataToLanding={this.setTweetUrl.bind(this)}/>
                    <SentimentOutput sentiment={this.state.result}/>
                </div>
                
            </div>
        );
    }
}

export default Landing;