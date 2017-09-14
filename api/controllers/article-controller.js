import {Article} from '../database/article';

export const getArticles = async (req, res) => {
    try {
        const articles = ((await Article.findAll()).map(article => article.get()));
        const returnedArticles = articles.map(article => {
            const {tablature, audio, ...rest} = article;
            return rest;
        });
        res.json(returnedArticles);
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}

export const getArticle = async (req, res) => {
    try {
        const article = (await Article.findById(req.params.id)).get();
        res.json(article);
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}
