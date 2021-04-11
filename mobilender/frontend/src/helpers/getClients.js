const axios = require('axios');
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const getClients = async() => {

    var clients = []

    try {
        const response = await axios.get(`/api/clientes/`);
        clients = response.data;
        console.log(clients);
    } 
    catch (error) {
        console.error(error);
    }

    // clients = clients.map(client => {
    //     return {
    //         name: client.name,
    //         code: client.code,
    //         picture: client.picture,
    //         address: client.address,
    //         tier: client.tier,
    //     }
    // })

    return clients;
};