import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, hashHistory} from 'react-router';
import routes from './routes';
import Main from './main'; // Our custom react component
import './style';

// Translation part
import translation from 'i18next';
import {french} from './config/translation/fr'

translation.init({
    lng: 'fr',
    resources: french
});

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
    <Main>
        <Router history={hashHistory} routes={routes} />
    </Main>
    , document.getElementById('app')
);
