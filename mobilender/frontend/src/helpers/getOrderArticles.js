const axios = require('axios');
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const getOrderArticles = async(id) => {

    var articles = [{}]

    try {
        const response = await axios.get(`/api/ordenes/${id}/articulos`);
        articles = response.data;
        // console.log("articles: " + id);
        // console.log(articles);
    } 
    catch (error) {
        console.error(error);
    }


    return articles;
};