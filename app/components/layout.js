import React, {PureComponent} from 'react';
import {AppBar, FloatingActionButton, IconButton} from 'material-ui';
import {ContentAdd, HardwareKeyboardBackspace} from 'material-ui/svg-icons';
import {capitalize} from 'lodash';
import 'material-design-lite/material';
import i18n from 'i18next';

export class Layout extends PureComponent {

    state = {
        isShown: false,
        buttonClassName: 'add-button'
    };

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

    render() {
        const {isShown, buttonClassName} = this.state;
        console.log('Layout Component :', this.props)
        return (
            <div className='global-layout'>
            <AppBar style={{position: 'fixed'}} className='global-appbar' title={this.getTitle(this.props.location.pathname)}/>
                <div className='separator' />
                {this.props.children}
                <FloatingActionButton ref='createFAB' className={buttonClassName} secondary={true}><ContentAdd /></FloatingActionButton>
                {!isShown ? this.showFAB : null}
            </div>
        )
    }
}
