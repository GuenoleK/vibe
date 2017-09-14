"use strict";

export const loadUser = async (id) => {
    const response = await fetch(`http://localhost:9999/api/user/${id}`);
    return await response.json();
}

export const signIn = async (username, password) => {
    const response = await fetch(`http://localhost:9999/api/user/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    const data = await response.json();
    if(data.username) {
        localStorage.setItem('user', JSON.stringify(data));
    } else {
        localStorage.removeItem('user');
    }
    return data;
    // if (data.token) {
    //     localStorage.setItem('token', data.token);
    //     return true;
    // } else {
    //     localStorage.removeItem('token');
    //     throw new Error(data.error);
    // }
}
