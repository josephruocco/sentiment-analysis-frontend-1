import React, {Component} from 'react'; 
import '../styles/SentimentResult.css'

class SentimentOutput extends Component {
    //to get information passed to SentimentOutput this.props.variableName
    constructor(props) {
        super(props); 
    }

    render() {
        return (
            <div className="resultBody">
                <p>{this.props.sentiment}</p>
            </div>
        );
    }
}

export default SentimentOutput;