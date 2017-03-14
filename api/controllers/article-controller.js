import {Article} from '../database/article';

export const getArticles = async (req, res, next) => {
    try {
        res.json(await Article.findAll());
        console.log('All articles are returned');
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}

export const getArticle = async (req, res, next) => {
    try {
        res.json((await Article.findById(req.params.id)).get());
        console.log('An article is returned');
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}
