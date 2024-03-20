import axios from 'axios';

const sendGraphQLRequest = async (url, requestType, graphqlBody) => {
    try {
      const response = await axios.post(url, {
        query: graphqlBody
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error.response ? error.response.data : error.message);
      throw error;
    }
  };

export default sendGraphQLRequest;