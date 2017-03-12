import {Article} from '../database/article';

export const getArticles = async (req, res, next) => {
    try {
        res.json(await Article.findAll());
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}

export const getArticle = async (res, req, next) => {
    console.log(req);
    try {
        res.json((await Article.findById(req.params.id)).get());
        console.log('An article was returned');
    } catch (e) {
        console.log(e);
    }
}
