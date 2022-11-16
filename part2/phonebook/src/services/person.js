import axios from "axios";

const base_url = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(base_url)
        .then(response => response.data);
    
        return request;
    
}

const create = (newPerson) => {
    return axios.post(base_url, newPerson).then(response => response.data)
}


export default {
    getAll,
    create
}