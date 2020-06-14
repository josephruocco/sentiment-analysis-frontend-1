import React, {Component} from 'react'; 
import '../styles/SentimentResult.css'

class SentimentOutput extends Component {
    //to get information passed to SentimentOutput this.props.variableName
    constructor(props) {
        super(props); 
        this.renderView = this.renderView.bind(this);
    }

    renderView(){
        // read the data passed into sentiment output section to display appropriate view 
        return (
            <div className="sentimentOutputBox">
                <div className="center-output rounded">
                    <p>{JSON.stringify(this.props.sentiment)}</p>
                </div> 
            </div>
        );
    }

    render() {
        if(this.props.sentiment){
            return this.renderView();
        }   
    }
}

export default SentimentOutput;