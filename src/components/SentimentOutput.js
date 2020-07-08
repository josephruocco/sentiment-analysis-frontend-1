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
		const sentimentAnalysis = this.state.sentenceId === -1  ? this.props.sentiment["document_tone"]  : this.props.sentiment["sentences_tone"][this.state.sentenceId];

		let newEmotions = {};

		if(sentimentAnalysis.tones){
			sentimentAnalysis.tones.forEach(
				analysis => (newEmotions = { ...newEmotions, [analysis.tone_id]: analysis.score })
			);
		}
		

		this.setState(prevState => {
			return { emotions: { ...initialEmotions, ...newEmotions } };
		});
	}


    componentDidMount = () => {
		if(this.props.sentment && this.props.sentiment["document_tone"]) {
			this.setEmotions();
		}
    }

    componentDidUpdate = (prevProps, prevState) => {
		if (this.props.sentiment !== prevProps.sentiment && this.props.sentiment && this.props.sentiment["document_tone"]) {
			this.setEmotions();
		}
    };

    renderView() {
		return (
			<div className="sentimentOutputBox">
				<div className="center-output rounded">
					{Object.keys(initialEmotions).map(emotion => {
						if(this.state.emotions[emotion] > 0 ) {
							return (
								<Gauge
									value={this.state.emotions[emotion]}
									title={`${emotion}`}
									key={emotion}
								/>

							);
						}
					})}
				</div>
			</div>
		);
	}

    waitRender(){
		return (
			<div className="sentimentOutputBox">
				<div className="center-output rounded">
					<Gauge
						value={0}
						title={`waiting for input`}
					/>
				</div>
			</div>
		);
	}

    render() {
		if(this.props.sentiment && this.props.sentiment.document_tone){
			return this.renderView();
		}
		else{
			return this.waitRender();
		}
    }
}

export default SentimentOutput;
