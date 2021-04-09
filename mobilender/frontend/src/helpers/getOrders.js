const axios = require('axios');
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const formatDate = (date) => {
    var formattedDate = new Date(date);
    formattedDate = formattedDate.toLocaleString();
    return formattedDate
}   

export const getOrders = async() => {

    var orders = [{}]

    try {
        const response = await axios.get(`/api/ordenes/`);
        orders = response.data;
        console.log(orders);
    } 
    catch (error) {
        console.error(error);
    }

    orders = orders.map(order => {
        return {
            id: order.id,
            client: order.client.name,
            created_at: order.created_at ? formatDate(order.created_at) : '',
            served_at: order.served_at ? formatDate(order.served_at) : 'No surtido',
            order_to: order.order_to.to,
            articles: order.articles
        }
    })

    return orders;
};