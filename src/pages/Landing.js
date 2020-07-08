import React, { useState, useEffect, Component } from 'react';
import InputBox from '../components/InputBox';
import SentimentOutput from '../components/SentimentOutput';
import bgImage from '../assets/colorful-waves.png';
import bgGrid from '../assets/grid.png';
import '../styles/Landing.css';




class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentTweetUrl: "",
            result: null
        };
    };

    setTweetUrl = (userInput) => {
        this.setState({currentTweetUrl: userInput});
    }

    setResult = (tweetResult) => {
        this.setState({result: tweetResult});        
    }

    render(){
        return (
            <div className="landing-body">
                <img src={bgGrid} className="bg-lines" alt="lines-image"/>
                <img  src={bgImage} className="bg-content" alt="bg-image"/>
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