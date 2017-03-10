const express = require('express');
const _ourController = require('./controllers/_our-controller');
const userController = require('./controllers/user-controller');

module.exports = function(app) {
    const apiRoutes = express.Router();

    //routes will go there
    apiRoutes.get('/helloworld', _ourController.helloworld);
    apiRoutes.get('/user/:id', userController.getUser);

    app.use('/api', apiRoutes);
}
