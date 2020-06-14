import React, {Component} from 'react'; 
import '../styles/InputBox.css';
import { getTweetSentiment } from '../actions/Tweet.js';

class InputBox extends Component {
    //to get information passed to InputBox  this.props.variableName
    constructor(props) {
        super(props); 
        this.state = {
            tweetUrl: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitTweetUrl = this.submitTweetUrl.bind(this);
    }

    submitTweetUrl(event) {
        event.preventDefault();
        // alert('input box: ' + this.state.tweetUrl);
        // call the function that calls the api 
        this.props.getTweetUrl(this.state.tweetUrl);
        getTweetSentiment(this.state.tweetUrl)
        .then(result => {
            if(result){
                this.props.getTweetSentiment(result);
            } else {
                this.props.getTweetSentiment({error:"error in getting tweet result"});
            }
        })
    }

    handleChange(event){
        event.preventDefault();
        this.setState({tweetUrl: event.target.value});        
    }

    render(){
        return (
            <div className="inputBox">
                <form className="form-inline center-form">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input className="form-control form-control-lg ml-3 w-75" type="text" placeholder="Enter a tweet url" value={this.state.tweetUrl} onChange={this.handleChange} aria-label="Search"></input>
                    <button onClick={this.submitTweetUrl} className="btn btn-lg btn-light">Analyze</button>
                </form>
            </div>    
        );
    }
}

export default InputBox;