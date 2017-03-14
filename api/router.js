const express = require('express');
const bodyParser = require('body-parser')
const _ourController = require('./controllers/_our-controller');
const userController = require('./controllers/user-controller');
const articleController = require('./controllers/article-controller');

module.exports = function(app) {
    const apiRoutes = express.Router();

    //routes will go there
    apiRoutes.get('/helloworld', _ourController.helloworld);
    apiRoutes.get('/user/:id', userController.getUser);
    apiRoutes.get('/user/', userController.getUsers);
    apiRoutes.post('/user/signin', userController.signIn);
    apiRoutes.get('/article/:id', articleController.getArticle);
    apiRoutes.get('/article/', articleController.getArticles);

    app.use('/api', apiRoutes);
    app.use(bodyParser.text());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

}
