/**
* In this file, we create a React component
* which incorporates components provided by Material-UI.
*/
import React, {Component} from 'react';
import {indigo500, pink500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AppBar, FontIcon, IconMenu, IconButton, MenuItem} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Layout} from './components/layout';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: indigo500,
        accent1Color: pink500,
    },
    snackbar: {
        actionColor: 'white'
    }
});

class Main extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div id='container'>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;
