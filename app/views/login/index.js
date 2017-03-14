import React, {PureComponent} from 'react';
import {Paper, RaisedButton, TextField} from 'material-ui';
import {Link} from 'react-router';
import i18next from 'i18next';

export class LoginView extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            margin: 20,
            textAlign: 'center',
            display: 'block',
        };

        return (
            <div className='login-form'>
                <span className='login-instruction-text'>Veuillez saisir vos identifiants</span>
                <div className='login-card'>
                    <Paper style={style} zDepth={1}>
                        <span>Bonjour</span>
                        <TextField hintText={i18next.t('login.username')} style={{width: '80%'}}/>
                        <TextField hintText={i18next.t('login.password')} style={{width: '80%'}}/>
                        <RaisedButton primary={true} label={i18next.t('login.signIn')} />
                    </Paper>
                </div>
            </div>
        );
    }
}
