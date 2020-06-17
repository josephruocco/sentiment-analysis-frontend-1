import axios from 'axios';

export const getTweetSentiment = async (url) => {
    try {
        let result = await axios.get('https://sat-backend.herokuapp.com/api/v1/sentiment_analyses/12312312321');
        return result.data; 
    } catch (err) {
        console.log(err.response);
    }
}

export default getTweetSentiment;