import React, { useState, useEffect, Component } from 'react';
import InputBox from '../components/InputBox';
import SentimentOutput from '../components/SentimentOutput';
import '../styles/Landing.css';



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
        //alert('parent: ' + this.state.result);
    }

    // get result from the sentiment analysis internal api
    // save it into the temporary state result
    // state is then automatically passed to the sentiment output section
    setResult = (tweetResult) => {
        this.setState({result: [tweetResult]});        
    }

    render(){
        return (
            <div className="fill">
                <h1 className="appTitle">Sentiment Analysis</h1>
                <div className="contentBody">
                    <InputBox getTweetUrl={this.setTweetUrl.bind(this)} getTweetSentiment={this.setResult.bind(this)}/>
                    <SentimentOutput sentiment={this.state.result}/>
                </div>
                
            </div>
        );
    }
}

export default Landing;