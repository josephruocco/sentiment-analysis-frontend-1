import axios from 'axios';

const getTweetSentiment = async () => {
    try {
        //let sentimentResult = await axios.get('https://sentiment-analysis-frontend.herokuapp.com/api/tweet')
        console.log("calling axios");
    } catch (err) {
        console.log(err.response);
    }
}

export default getTweetSentiment;