import axios from "axios";

export function register(user){
    console.log(user);
    return axios.post("http://localhost:8300/gateway/registration", user);
}

export function login(user){
    console.log(user);
    return axios.get("http://localhost:8300/gateway/login", user);
}