import React from 'react';
import {HomeView} from './views/home';
import {ArticleEditionView} from './views/edition';
import {Layout} from './components/layout'

export default {
    path: '/',
    component: (props) => <Layout {...props} />,
    indexRoute: { onEnter: ({params}, replace) => replace('home') },
    childRoutes: [
        {
            path: 'home',
            component: HomeView
        },
        {
            path: 'edit-article/:id',
            component: (props) => <ArticleEditionView {...props} />
        },
        {
            path: 'tutorial/:id',
            component: (props) => <HomeView {...props} />
        }
    ]
};
