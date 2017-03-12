"use strict";

export const loadUser = async (id) => {
    console.log('Load an unic User Service');
    const response = await fetch(`http://localhost:9999/api/user/${id}`);
    return await response.json();
}
