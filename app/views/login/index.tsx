import React from 'react';
import {Paper, RaisedButton, Snackbar, TextField} from 'material-ui';
import ActionAccountCirle from 'material-ui/svg-icons/action/account-circle';
import {Link} from 'react-router';
import i18next from 'i18next';
import {signIn} from '../../services/user-services/index';

interface LoginViewProps {
    router?: any;
}

interface LoginViewState {
    username : string;
    password : string;
    usernameError : string;
    passwordError : string;
    isSnackbarOpen : boolean;
    snackbarMessage : string;
    snackbarColor : string;
}

export class LoginView extends React.Component < LoginViewProps,
LoginViewState > {

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
        this.setState({
            username: (document.querySelector(".login-text-field").childNodes[1]as HTMLInputElement).value,
            usernameError: null
        });
    }

    onUsernameBlurHandler = (evt) => {
        const value = (document.querySelector(".login-text-field").childNodes[1]as HTMLInputElement).value;
        if (value === '') {
            this.setState({
                username: value,
                usernameError: i18next.t('login.textFieldError')
            })
        } else if (value !== '' && this.state.usernameError !== null) {
            this.setState({username: value, usernameError: null});
        }
    }

    onPasswordChangeHandler = (evt) => {
        this.setState({
            password: (document.querySelector(".login-text-password").childNodes[1]as HTMLInputElement).value,
            passwordError: null
        });
    }

    onPasswordBlurHandler = (evt) => {
        const value = (document.querySelector(".login-text-password").childNodes[1]as HTMLInputElement).value;

        if (value === '') {
            this.setState({
                password: value,
                passwordError: i18next.t('login.textFieldError')
            })
        } else if (value !== '' && this.state.passwordError !== null) {
            this.setState({password: value, passwordError: null});
        }
    }

    showSnackbar = (message, color) => {
        this.setState({
            snackbarMessage: i18next.t(message),
            isSnackbarOpen: true,
            snackbarColor: color
        });
    }

    handleSnackbarClose = () => {
        this.setState({isSnackbarOpen: false});
    }

    onSignInClick = () => {
        const {username, password, usernameError, passwordError} = this.state;
        if (usernameError === null && passwordError === null) {
            signIn(username, password).then(data => {
                if (data.error) {
                    this.showSnackbar(i18next.t(data.error), 'red')
                } else {
                    this.showSnackbar('login.snackbar.success', 'green');
                    this
                        .props
                        .router
                        .push('/home')
                }
            });
        } else {
            this.showSnackbar('login.snackbar.globalError', 'red')
        }
    }

    handleOnKeyDown = (event) => {
        const {which} = event;
        const {username, password} = this.state;
        if (which === 13) {
            this.onUsernameBlurHandler(event);
            this.onPasswordBlurHandler(event);
            setTimeout(() => {
                this.onSignInClick()
            }, 20);
        }
    };

    render() {
        const {usernameError, passwordError, snackbarColor, snackbarMessage} = this.state;

        const loginTextFieldStyle = {
            width: '80%',
            marginBottom: '15px',
            textTransform: 'capitalize'
        }

        return (
            <div className='login-form'>
                <span className='login-instruction-text'>Veuillez saisir vos identifiants</span>
                <div className='login-card'>
                    <Paper
                        style={{
                        margin: 20,
                        textAlign: 'center',
                        backgroundColor: '#F7F7F7',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '15px'
                    }}
                        zDepth={1}>
                        <ActionAccountCirle
                            style={{
                            size: '50px',
                            display: 'block',
                            height: '120px',
                            width: 'none',
                            color: 'rgba(50, 50, 50, 0.5)'
                        }}/>
                        <TextField
                            className='login-text-field'
                            errorText={usernameError}
                            hintText={i18next.t('login.username')}
                            onBlur={this.onUsernameBlurHandler}
                            onChange={this.onUsernameChangeHandler}
                            ref='loginUsername'
                            onKeyDown={this.handleOnKeyDown}
                            style={loginTextFieldStyle}/>
                        <TextField
                            className="login-text-password"
                            type='password'
                            errorText={passwordError}
                            hintText={i18next.t('login.password')}
                            onBlur={this.onPasswordBlurHandler}
                            onChange={this.onPasswordChangeHandler}
                            onKeyDown={this.handleOnKeyDown}
                            ref='loginPassword'
                            style={loginTextFieldStyle}/>
                        <RaisedButton
                            label={i18next.t('login.signIn')}
                            onClick={this.onSignInClick}
                            overlayStyle={{
                            backgroundColor: 'rgba(0, 0, 255, 0.5)'
                        }}
                            primary={true}/>
                    </Paper>
                </div>
                <Snackbar
                    action={i18next.t('login.snackbar.close')}
                    autoHideDuration={2500}
                    message={snackbarMessage}
                    onActionTouchTap={this.handleSnackbarClose}
                    onRequestClose={this.handleSnackbarClose}
                    open={this.state.isSnackbarOpen}
                    bodyStyle={{
                    backgroundColor: snackbarColor
                }}/>
            </div>
        );
    }
}
