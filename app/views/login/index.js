import React, {PureComponent} from 'react';
import {Paper} from 'material-ui';
import {Link} from 'react-router';
import i18next from 'i18next';

export class LoginView extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            height: '40%',
            width: '100%',
            margin: 20,
            textAlign: 'center',
            display: 'block',
        };

        return (
            <div className='login-form'>
                <span className='site-title'>SHARE MUSIC, FEEL THE VIBE</span>
                <Paper style={style} zDepth={1}>
                    Bonjour
                </Paper>
            </div>
        );
    }
}
