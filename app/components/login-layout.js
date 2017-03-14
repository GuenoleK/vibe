import React, {PureComponent} from 'react';
import {FlatButton, RaisedButton, CircularProgress} from 'material-ui';
import {Link} from 'react-router';
import i18next from 'i18next';

export class LoginLayout extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='login-layout'>
                <div className='login-bar'>
                    <span className='login-header-text'>SHARE THE MUSIC, FEEL THE VIBE !</span>
                </div>
                {this.props.children}
            </div>
        );
    }
}
