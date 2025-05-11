import axios from "axios";

export const API_BASE_URL = "http://localhost:4000"


//in here axios.create mean making custom version.it mean when calling API endpoint using axios it automatically use baseUrl and
//send jwt tokens in API requests. and content type mean sending or recieving json type data
//api is instance of axios
export const api = axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json"
    }
})