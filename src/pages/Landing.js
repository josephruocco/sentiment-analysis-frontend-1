import React, { useState, useEffect, Component } from 'react';
import InputBox from '../components/InputBox';
import SentimentOutput from '../components/SentimentOutput';
import '../styles/Landing.css';



class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    };

    render(){
        return (
            <div className="fill">
                <h1 className="appTitle">Sentiment Analysis</h1>
                <div className="contentBody">
                    <InputBox/>
                    <SentimentOutput/>
                </div>
                
            </div>
        );
    }
}

export default Landing;