"use strict";

export const loadArticles = async () => {
    console.log('Loads all Articles');
    const response = await fetch(`http://localhost:9999/api/article`);
    return await response.json();
}

export const loadArticle = async (id) => {
    console.log('Loads an unic Article');
    const response = await fetch(`http://localhost:9999/api/article/${id}`);
    return await response.json();
}
