"use strict";

export const loadArticles = async () => {
    console.log('Load Articles Services');
    const response = await fetch(`http://localhost:9999/api/article`);
    return await response.json();
}
