import React, { Component } from "react";
import Gauge from "./Gauge";

const initialEmotions = {
    sadness: 0,
    analytical: 0,
    anger: 0,
    fear: 0,
    tentative: 0,
    joy: 0
};

export default class SentimentOutput extends Component {
    constructor(props) {
	super(props);
	this.state = {
	    sentenceId: -1,
	    emotions: { ...initialEmotions }
	};
    }

    setEmotions = () => {
	const sentimentAnalysis =
	      this.state.sentenceId === -1
              ? this.props.sentiment["document_tone"]
              : this.props.sentiment["sentences_tone"][this.state.sentenceId];

	let newEmotions = {};

	sentimentAnalysis.tones.forEach(
	    analysis =>
		(newEmotions = { ...newEmotions, [analysis.tone_id]: analysis.score })
	);

	this.setState(prevState => {
	    return { emotions: { ...initialEmotions, ...newEmotions } };
	});
    };

    componentDidMount = () => this.setEmotions();

    render() {
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
}
