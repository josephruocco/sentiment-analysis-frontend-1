import axios from 'axios';

export const getTweetSentiment = async (url) => {
    try {
        let result = await axios.get('https://reqres.in/api/users/2');
        return result.data; 
    } catch (err) {
        console.log(err.response);
    }
}

export default getTweetSentiment;