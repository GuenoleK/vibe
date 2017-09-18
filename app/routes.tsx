import React from 'react';
import {ArticleConsultationView} from './views/article/consult';
import {Layout} from './components/layout'
import {LoginLayout} from './components/login-layout';
import {HomeView} from "./views/home";
import {LoginView} from './views/login/index';
import {ArticleEditionView} from './views/edition/index';

const defaultLayout = (props) => {
    const user = localStorage.getItem('user');
    return(
        <div style={{height: '100%'}}>
            {user && <Layout {...props} />}
            {!user && <LoginLayout {...props}/>}
        </div>
    )
}

export const routes = {
    path: '/',
    component: defaultLayout,
    indexRoute:
    {
        onEnter: ({params}, replace) => {
            const user = localStorage.getItem('user');
            user === null || user === undefined ? replace('login') : replace('home')
        }
    },
    childRoutes:
    [
        {
            path: 'login',
            component: LoginView
        },
        {
            path: 'home',
            component: HomeView
        },
        {
            path: 'article/:id',
            component: (props) => {
                return(
                    <ArticleConsultationView {...props} />
                )
            }
        },
        {
            path: 'edit-article/:id',
            component: (props) => {
                return(
                    <ArticleEditionView {...props} />
                )
            }
        },
        {
            path: 'tutorial/:id',
            component: (props) => {
                return(
                    <HomeView {...props} />
                )
            }
        }
    ]
};
