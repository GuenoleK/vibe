"use strict";

export const loadUser = async (id) => {
    console.log('Load an unic User Service');
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
    return await response.json();
    // if (data.token) {
    //     localStorage.setItem('token', data.token);
    //     return true;
    // } else {
    //     localStorage.removeItem('token');
    //     throw new Error(data.error);
    // }
}
