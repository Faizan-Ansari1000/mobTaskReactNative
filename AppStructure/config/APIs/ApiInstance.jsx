import axios from "axios";

const ApiInstance = axios.create({
    baseURL: 'https://mob-task-app-backend.vercel.app',
})

export default ApiInstance;