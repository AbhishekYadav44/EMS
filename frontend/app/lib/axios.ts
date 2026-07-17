import axios from "axios";


const api = axios.create({

    baseURL:"https://ems-xpnx.onrender.com/api",
    headers:{
        "Content-Type":"application/json"
    }

});


export default api;