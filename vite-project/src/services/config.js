import axios from "axios"

const api = axios.create({
    baseURL: 'https://text-generator-api.onrender.com'
})

export default api