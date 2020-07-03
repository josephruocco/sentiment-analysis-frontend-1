import React, { Component } from "react";
import Gauge from "./Gauge";
import '../styles/SentimentResult.css'

const initialEmotions = {
    sadness: 0,
    analytical: 0,
    anger: 0,
    fear: 0,
    tentative: 0,
    confident: 0,
    joy: 0
};

class SentimentOutput extends Component {
    constructor(props) {
	super(props);
	this.renderView = this.renderView.bind(this);
	this.state = {
	    sentenceId: -1,
	    emotions: { ...initialEmotions }
	};
    }

    setEmotions = () => {
	if(this.props.sentiment){
	    const sentimentAnalysis = this.state.sentenceId === -1  ? this.props.sentiment["document_tone"]  : this.props.sentiment["sentences_tone"][this.state.sentenceId];

	    let newEmotions = {};

	    sentimentAnalysis.tones.forEach(
		analysis =>
		    (newEmotions = { ...newEmotions, [analysis.tone_id]: analysis.score })
	    );

	    this.setState(prevState => {
		return { emotions: { ...initialEmotions, ...newEmotions } };
	    });
	}
    };

    
    componentDidMount = () => {
	if(this.props.sentment){
	    this.setEmotions();
	} 
    }
    
    
    renderView() {
	return (
		<>
		{Object.keys(initialEmotions).map(emotion => {
		    return (
			   
			    <Gauge 
			value={this.state.emotions[emotion]}
			title={`sentiment analysis ${emotion}`}
			key={emotion}
			    />
			   
		    );
		})}
	    </>
	);
    }

    waitRender = () => <div>[Waiting for input]</div>;
    
    render() {
	if(this.props.sentiment){
	    return this.renderView();
	}
	else{
	    return this.waitRender();
	}
    }
}

export default SentimentOutput;
