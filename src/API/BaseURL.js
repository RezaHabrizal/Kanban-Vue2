const axios = require("axios");

export default axios.create({   
    baseURL: "https://kanban-rz.herokuapp.com"
});