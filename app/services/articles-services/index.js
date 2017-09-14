"use strict";

export const loadArticles = async () => {
    const response = await fetch(`http://localhost:9999/api/article`);
    return await response.json();
}

export const loadArticle = async (id) => {
    const response = await fetch(`http://localhost:9999/api/article/${id}`);
    return await response.json();
}
