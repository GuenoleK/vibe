import React, {PureComponent} from 'react';
import {Avatar, AppBar, Drawer, FloatingActionButton, FontIcon, IconButton, MenuItem, Subheader} from 'material-ui';
import {ContentAdd} from 'material-ui/svg-icons';
import {capitalize} from 'lodash';
import 'material-design-lite/material';
import i18n from 'i18next';

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
        this.showFAB();
    }

    // This will give or remove animation class on the add button
    showFAB = () => {
        const {isShown, buttonClassName} = this.state;
        if (this.refs.createFAB.props.className === 'add-button') {
            this.setState({buttonClassName: 'add-button show', isShown: !isShown})
        } else {
            this.setState({buttonClassName: 'add-button', isShown: !isShown})
        }
    }

    // This will return the correct title
    getTitle(pathname) {
        const pathArray = pathname.split("/");
        return capitalize(i18n.t(pathArray[1]));
    }

    setMenuItemStyle(name) {
        return this.checkMenuItem(name) ? {
            backgroundColor: 'rgba(0,0,0,0.0980392)',
            paddingTop: '5px'
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

    render() {
        const {isShown, buttonClassName, drawerIsOpen} = this.state;
        return (
            <div className='global-layout'>
                <AppBar
                    onLeftIconButtonTouchTap={this.toggleDrawer}
                    style={{position: 'fixed', paddingTop: '15px'}}
                    className='global-appbar'
                    title={this.getTitle(this.props.location.pathname)}
                    iconElementRight={<IconButton iconClassName='material-icons'>account_circle</IconButton>}
                    iconStyleRight={{alignSelf: 'center', marginTop: '0px', marginRight: '10px'}}
                />
                <Drawer docked={false} width={300} open={drawerIsOpen} onRequestChange={(drawerIsOpen) => this.setState({drawerIsOpen})}>
                    <AppBar
                        style={{position: 'fixed', paddingTop: '5px'}}
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
                {!isShown ? this.showFAB : null}
            </div>
        )
    }
}
