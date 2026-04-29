import axios from "axios"

const api = axios.create({
  baseURL: "https://college-event-backend-ab78.onrender.com/api"
  //  baseURL: "http://localhost:5000/api"
  
})

export default api