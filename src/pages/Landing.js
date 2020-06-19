import React, { useState, useEffect, Component } from 'react';
import InputBox from '../components/InputBox';
import SentimentOutput from '../components/SentimentOutput';
import '../styles/Landing.css';
import '../assets/colorful-waves.png';



class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTweetUrl: "",
            result: ["waiting for input"]
        };
    };

    setTweetUrl = (userInput) => {
        this.setState({currentTweetUrl: userInput});
    }

    setResult = (tweetResult) => {
        this.setState({result: [tweetResult]});        
    }

    render(){
        return (
            <div className="fill">
                <section className="bg-content fill">
                </section>
                <div className="main-content"> 
                    <h1 className="appTitle">Sentiment Analysis</h1>
                    <div className="contentBody">
                        <InputBox saveTweetUrlToLanding={this.setTweetUrl.bind(this)} saveSentimentToLanding={this.setResult.bind(this)}/>
                        <SentimentOutput sentiment={this.state.result}/>
                    </div>
                </div> 
            </div>
        );
    }
}

export default Landing;