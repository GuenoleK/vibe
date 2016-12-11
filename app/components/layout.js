import React, {PureComponent} from 'react';
import {Avatar, AppBar, Drawer, FloatingActionButton, IconButton, MenuItem, Subheader} from 'material-ui';
import {ContentAdd, HardwareKeyboardBackspace, SocialPerson} from 'material-ui/svg-icons';
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

    toggleDrawer = () => this.setState({drawerIsOpen: !this.state.drawerIsOpen});

    render() {
        const {isShown, buttonClassName, drawerIsOpen} = this.state;
        console.log('Layout Component :', this.props)
        return (
            <div className='global-layout'>
                <AppBar
                    onLeftIconButtonTouchTap={this.toggleDrawer}
                    style={{position: 'fixed'}}
                    className='global-appbar'
                    title={this.getTitle(this.props.location.pathname)}
                    iconElementRight={<Avatar size={35} icon={<SocialPerson/>} style={{cursor: 'pointer'}}/>}
                    iconStyleRight={{alignSelf: 'center', marginTop: '0px', marginRight: '10px'}}
                />
                <Drawer docked={false} width={300} open={drawerIsOpen} onRequestChange={(drawerIsOpen) => this.setState({drawerIsOpen})}>
                <Subheader>Recent chats</Subheader>
                    <MenuItem onTouchTap={this.toggleDrawer}>Menu Item</MenuItem>
                    <MenuItem onTouchTap={this.toggleDrawer}>Menu Item 2</MenuItem>
                </Drawer>
                <div className='separator' />
                {this.props.children}
                <FloatingActionButton ref='createFAB' className={buttonClassName} secondary={true}><ContentAdd /></FloatingActionButton>
                {!isShown ? this.showFAB : null}
            </div>
        )
    }
}
