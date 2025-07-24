import axios from "axios";

const ApiInstance = axios.create({
    baseURL: '',
})

export default ApiInstance;
