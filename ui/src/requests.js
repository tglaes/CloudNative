import axios from "axios";

export function register(user){
    console.log(user);
    return axios.post("http://localhost:8300/gateway/registration", user,
        {headers: {'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json'}
    });
}

export function login(user){
    console.log(user);
    return axios.get("http://localhost:8300/gateway/login", user);
}

export function sendMessage(data){
    console.log(data);
    return axios.get("http://localhost:8300/gateway/sendMessage?=" + data);
}

