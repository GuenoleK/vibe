import React, {PureComponent} from 'react';
import {Avatar, AppBar, Drawer, FloatingActionButton, FontIcon, IconButton, MenuItem, FlatButton, Subheader, TextField} from 'material-ui';
import {ContentAdd} from 'material-ui/svg-icons';
import {capitalize} from 'lodash';
import 'material-design-lite/material';
import i18next from 'i18next';

export class Layout extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isShown: false,
            buttonClassName: 'add-button',
            drawerIsOpen: false
        };
    }

    componentDidMount() {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        if(loggedUser.role === 'admin') {
            this.setState({buttonClassName: 'add-button show', isShown: !this.state.isShown})
        }
    }

    componentWillUnmount() {
        this.setState({buttonClassName: 'add-button', isShown: !this.state.isShown})
    }

    // This will return the correct title
    getTitle(pathname) {
        const pathArray = pathname.split("/");
        return capitalize(i18next.t(pathArray[1]));
    }

    setMenuItemStyle(name) {
        return this.checkMenuItem(name) ? {
            backgroundColor: 'rgba(0,0,0,0.0980392)'
        } : null;
    }

    handleItemClick(path, ref) {
        this.toggleDrawer();
        if(this.refs[ref].props.focusState !== 'focused') {
            switch (path) {
                case '/':
                this.props.router.push(path);
                break;
                case '/tutorial':
                this.props.router.push(`${path}/1`);
                break;
                default:
                return null;
            }
        }
    };

    checkMenuItem(name) {
        return name === this.getTitle(this.props.location.pathname);
    }

    toggleDrawer = () => this.setState({drawerIsOpen: !this.state.drawerIsOpen});

    handleEditButtonClick = () => {
        // Here we save an article, we get its id then we got on the edit page
        // gotta call a service here
        let id;
        // id = this.props.saveArticle();
        this.props.router.push(!id ? `edit-article/1` : `edit-article/${id}`);
    }

    onButtonLogOutClick = () => {
        localStorage.removeItem('user');
        this.props.router.push('/');
    }

    render() {
        const {buttonClassName, drawerIsOpen} = this.state;
        return (
            <div className='global-layout'>
                <AppBar
                    onLeftIconButtonTouchTap={this.toggleDrawer}
                    style={{position: 'fixed', paddingTop: '6px'}}
                    className='global-appbar'
                    title={
                        <div data-component='global-appbar-title'>
                            <span className='global-appbar-title'>{this.getTitle(this.props.location.pathname)}</span>
                            <div className='global-appbar-search'>
                                <div className='searchbar-container'>
                                    <i className='material-icons' style={{color: 'white', padding: 6}}>search</i>
                                    <TextField
                                        id='search-bar'
                                        inputStyle={{color: 'white'}}
                                        underlineShow={false}
                                        hintText={`${i18next.t('search.placeholder')}`}
                                        hintStyle={{color: 'rgba(255,255,255,0.6)'}}
                                        style= {{marginLeft: 2, width: '100%'}}
                                        onFocus={e => {
                                            e.target.parentNode.parentNode.style.backgroundColor = 'transparent';
                                            e.target.parentNode.parentNode.style.boxShadow = '0px 1px 3px rgba(0,0,0,0.3)';
                                        }}

                                        onBlur={e => {
                                            e.target.parentNode.parentNode.style.backgroundColor = 'rgba(0,0,0,0.18)';
                                            e.target.parentNode.parentNode.style.boxShadow = undefined;
                                        }}
                                        />
                                </div>
                            </div>
                        </div>
                    }
                    iconElementRight={<FlatButton label='Déconnexion' onClick={this.onButtonLogOutClick} style={{marginTop: '3px', verticalAlign: 'middle'}}primary={true} />}
                    iconStyleRight={{alignSelf: 'center', marginTop: '0px', marginRight: '10px'}}
                    />
                <Drawer docked={false} width={300} open={drawerIsOpen} onRequestChange={(drawerIsOpen) => this.setState({drawerIsOpen})}>
                    <AppBar
                        style={{position: 'fixed', paddingTop: '6px'}}
                        iconElementLeft={<IconButton iconClassName='material-icons'>arrow_back</IconButton>}
                        onTitleTouchTap={this.toggleDrawer}
                        onLeftIconButtonTouchTap={this.toggleDrawer}
                        className='menu-appbar'
                        title='Menu'
                        />
                    <div className='separator' />
                    <MenuItem style={this.setMenuItemStyle('Accueil')} focusState={this.checkMenuItem('Accueil') ? 'focused' : 'none'} ref='menuItemHome'onTouchTap={() => this.handleItemClick('/', 'menuItemHome')} primaryText='Accueil' leftIcon={<FontIcon className='material-icons'>home</FontIcon>}/>
                    <MenuItem style={this.setMenuItemStyle('Tutoriel')} focusState={this.checkMenuItem('Tutoriel') ? 'focused' : 'none'} ref='menuItemTuto' onTouchTap={() => this.handleItemClick('/tutorial', 'menuItemTuto')} primaryText='Tutoriels' leftIcon={<FontIcon className='material-icons'>class</FontIcon>}/>
                </Drawer>
                {this.props.children}
                <FloatingActionButton onClick={this.handleEditButtonClick} ref='createFAB' className={buttonClassName} secondary={true}><ContentAdd /></FloatingActionButton>
            </div>
        )
    }
}
