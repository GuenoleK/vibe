import {Article} from '../database/article';

export const getArticles = async (req, res, next) => {
    try {
        res.json(await Article.findAll());
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}
