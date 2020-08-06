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
		this.renderTweetTextView = this.renderTweetTextView.bind(this);
		this.renderNoDocTonesView = this.renderNoDocTonesView.bind(this);
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
			return { documentView:true, sentenceTones: [], emotions: { ...initialEmotions, ...newEmotions } };
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

	getMaxScoreEmotion(tones_arr){
		var max = 0.0;
		var emotion = "";
		tones_arr.forEach(item => {
			if(item.score > max){
				max = item.score; 
				emotion = item.tone_id; 
			}
		}); 
		return emotion;
	}

	getTweetText(){
		if(this.props.sentiment.sentences_tone){
			return(
				<div>
					{
						this.props.sentiment.sentences_tone.map((sent) => {
							
							var emotion = this.getMaxScoreEmotion(sent.tones); 					

							return (
								<p 
								onClick={() => this.setSentenceTones(sent.tones)} 
								className={`sentence-hover ${emotion}`}
								title={emotion}>
									{sent.text}
								</p>
							);
						 })
					}
				</div>
			);
		} 

		var docTones = this.getMaxScoreEmotion(this.props.sentiment.document_tone.tones);
		return(
			<p className={docTones} title={docTones}>{this.props.sentiment.tweet_text}</p>
		);
	}

	renderSentenceTonesView(){
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

	renderTweetTextView(){
		var docTones = this.getMaxScoreEmotion(this.props.sentiment.document_tone.tones);
		return(
			<div className="tweet-text-wrapper">
				<p className="usage">
					Tweet displayed below. Click on each line to see the sentimenet per line. 
					Hover over each line below to see the sentiment with highest score.
					Hover over each speedometer to learn more about each sentiment. 
				</p>
				<h3 
					onClick={() => this.setDocTones()} 
					className={`sentence-hover sent-title ${docTones}`}
					title={docTones}
				>Overall Tweet Sentiment</h3>
				
				{this.getTweetText()}
			</div>
		);
	}

	renderSentenceView(){
		return (
			<div className="sentimentOutputBox">
				<div className="center-output rounded">
					{this.renderTweetTextView()}
					
					{this.renderSentenceTonesView()}
				</div>
			</div>
		);
	}

	renderNoDocTonesView(){
		var noEmotions = true; 
		for (var item in this.state.emotions) {
			if (this.state.emotions[item] !== 0)
			{
				noEmotions = false; 
				break;
			}
		}
		
		if(noEmotions){
			return(
				<p className="no-sentiment">Watson was not able to detect any sentiments. </p>
			);
		}
	}

    renderView() {
		return (
			<div className="sentimentOutputBox">
				<div className="center-output rounded">
					{this.renderTweetTextView()}
					
					<div className="sentiment-display-wrapper">
						{this.renderNoDocTonesView()}
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
						<p className="usage">
							Tweet displayed below. Click on each line to see the sentimenet and score displayed on the right. 
							Hover over each colored line below to see its sentiment.
							Hover over each speedometer to learn more about each sentiment. 
						</p>
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
