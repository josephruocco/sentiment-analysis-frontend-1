import React, {Component} from 'react'; 
import '../styles/SentimentResult.css'

class SentimentOutput extends Component {
    //to get information passed to SentimentOutput this.props.variableName
    constructor(props) {
        super(props); 
        this.state = {
        };
    }
    render() {
        return (
            <div className="resultBody">
                <p>Sentiment Result</p>
            </div>
        )
    }
}

export default SentimentOutput;