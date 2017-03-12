import {Article} from '../database/article';

export const getArticles = async (req, res, next) => {
    try {
        res.json(await Article.findAll());
        console.log('Returns all articles');
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
    res.json(await Article.findAll());
}
