import React, {PureComponent} from 'react';
import {Paper, RaisedButton, Snackbar, TextField} from 'material-ui';
import ActionAccountCirle from 'material-ui/svg-icons/action/account-circle';
import {Link} from 'react-router';
import i18next from 'i18next';
import {signIn} from '../../services/user-services';

export class LoginView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameError: null,
            passwordError: null,
            isSnackbarOpen: false,
            snackbarMessage: '',
            snackbarColor: 'black'
        }
    }

    onUsernameChangeHandler = (evt) => {
        this.setState({username: evt.target.value, usernameError: null});
    }

    onUsernameBlurHandler = (evt) => {
        const value = evt.target.value;
        if(value === '') {
            this.setState({username: value, usernameError: i18next.t('login.textFieldError')})
        } else if(value !== '' && this.state.usernameError !== null) {
            this.setState({username: value, usernameError: null});
        }
    }

    onPasswordChangeHandler = (evt) => {
        this.setState({password: evt.target.value, passwordError: null});
    }

    onPasswordBlurHandler = (evt) => {
        const value = evt.target.value;
        if(value === '') {
            this.setState({password: value, passwordError: i18next.t('login.textFieldError')})
        } else if(value !== '' && this.state.passwordError !== null) {
            this.setState({password: value, passwordError: null});
        }
    }

    showSnackbar = (message, color) => {
        this.setState({snackbarMessage: i18next.t(message), isSnackbarOpen: true, snackbarColor: color});
    }

    handleSnackbarClose = () => {
        this.setState({isSnackbarOpen: false});
    }

    onSignInClick = () => {
        const {username, password, usernameError, passwordError} = this.state;
        if(usernameError === null || passwordError === null) {
            console.log('Call login on server');
            signIn(username, password).then(data => console.log(data));
            this.showSnackbar('login.snackbar.success', 'green');
        } else {
            this.showSnackbar('login.snackbar.failure', 'red');
        }
    }

    render() {
        const {usernameError, passwordError, snackbarColor, snackbarMessage} = this.state;
        const paperStyle = {
            margin: 20,
            textAlign: 'center',
            display: 'block',
            backgroundColor: '#F7F7F7',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px'
        };
        const loginTextFieldStyle = {
            width: '80%',
            marginBottom: '15px',
            textTransform: 'capitalize'
        }

        return (
            <div className='login-form'>
                <span className='login-instruction-text'>Veuillez saisir vos identifiants</span>
                <div className='login-card'>
                    <Paper style={paperStyle} zDepth={1}>
                        <ActionAccountCirle style={{size: '50px', display: 'block', height: '120px', width: 'none', color: 'rgba(50, 50, 50, 0.5)'}} />
                        <TextField className='login-text-field' errorText={usernameError} hintText={i18next.t('login.username')} onBlur={this.onUsernameBlurHandler} onChange={this.onUsernameChangeHandler} ref='loginUsername' style={loginTextFieldStyle} />
                        <TextField type='password' errorText={passwordError} hintText={i18next.t('login.password')} onBlur={this.onPasswordBlurHandler} onChange={this.onPasswordChangeHandler} ref='loginPassword' style={loginTextFieldStyle} />
                        <RaisedButton label={i18next.t('login.signIn')} onClick={this.onSignInClick} overlayStyle={{ backgroundColor: 'rgba(0, 0, 255, 0.5)'}} primary={true}/>
                    </Paper>
                </div>
                <Snackbar
                    action={i18next.t('login.snackbar.close')}
                    autoHideDuration={2500}
                    message={snackbarMessage}
                    onActionTouchTap={this.handleSnackbarClose}
                    onRequestClose={this.handleSnackbarClose}
                    open={this.state.isSnackbarOpen}
                    bodyStyle={{backgroundColor: snackbarColor}}
                    />
            </div>
        );
    }
}
