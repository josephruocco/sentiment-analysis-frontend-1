import React, { Component } from "react";
import Gauge from "./Gauge";
import {SentimenDef} from './SentimentDef';
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
		this.state = {
			documentView: true,
			sentenceTones: [],
			sentenceId: -1,
			emotions: { ...initialEmotions }
		};

		this.renderView = this.renderView.bind(this);
		this.setSentenceTones = this.setSentenceTones.bind(this);
		this.setDocTones = this.setDocTones.bind(this);
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

	setSentenceTones(tones_arr) {
		if(tones_arr){
			this.setState({documentView: false, sentenceTones: tones_arr}); 
		}
	}

	setDocTones(){
		if(!this.state.documentView){
			this.setState({documentView: true}); 
		}
	}

	renderTweetText(){
		if(this.props.sentiment.sentences_tone){
			return(
				<div>
					{
						this.props.sentiment.sentences_tone.map((sent) => {
							return <p onClick={() => this.setSentenceTones(sent.tones)}>{sent.text}</p>
						 })
					}
				</div>
			);
		} 

		return(
			<p>{this.props.sentiment.tweet_text}</p>
		);
	}

	getSentenceTones(){
		if(this.state.sentenceTones.length > 0 ){
			return(
				<div className="sentiment-display-wrapper">
					{this.state.sentenceTones.map((emotion) => {
						return (
							<span title={SentimenDef[emotion.tone_id]}>
								<Gauge
									value={emotion.score}
									title={emotion.tone_name}
								/>
							</span>
							
						);
					})}
				</div>
			);
		} 
		return(
			<div className="sentiment-display-wrapper">
				<Gauge
					value={0}
					title={"none"}
				/>
			</div>
		);
		
	}

	renderSentenceView(){
		return (
			<div className="sentimentOutputBox">
				<div className="center-output rounded">
					<div className="tweet-text-wrapper">
						<h3 onClick={() => this.setDocTones()}>Full Tweet Text</h3>
						{this.renderTweetText()}
					</div>
					
					{this.getSentenceTones()}
				</div>
			</div>
		);
	}

    renderView() {
		return (
			<div className="sentimentOutputBox">
				<div className="center-output rounded">
					<div className="tweet-text-wrapper">
						<h3 onClick={() => this.setDocTones()}>Overall Tweet Sentiment</h3>
						{this.renderTweetText()}
					</div>
					
					<div className="sentiment-display-wrapper">
						{Object.keys(initialEmotions).map(emotion => {
							if(this.state.emotions[emotion] > 0 ) {
								return (
									<span title={SentimenDef[emotion]}>
										<Gauge
											value={this.state.emotions[emotion]}
											title={`${emotion}`}
											key={emotion}
										/>
									</span>
								);
							}
						})}
					</div>
				</div>
			</div>
		);
	}

    waitRender(){
		return (
			<div className="sentimentOutputBox">
				<div className="center-output rounded">
					<div className="tweet-text-wrapper">
						<h3>Tweet Text</h3>
					</div>
					<div className="sentiment-display-wrapper">
						<Gauge
							value={0}
							title={`waiting for input`}
						/>
					</div>
				</div>
			</div>
		);
	}

    render() {
		if(this.props.sentiment && this.props.sentiment.document_tone){
			if(this.state.documentView){
				return this.renderView();
			} else {
				return this.renderSentenceView();
			}
			
		}
		else{
			return this.waitRender();
		}
    }
}

export default SentimentOutput;
