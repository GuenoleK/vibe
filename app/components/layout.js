import React, {PureComponent} from 'react';
import {AppBar, FloatingActionButton } from 'material-ui';
import {ContentAdd} from 'material-ui/svg-icons';
import 'material-design-lite/material';

class Layout extends PureComponent {

    state = {
        isShown: false,
        buttonClassName: 'add-button'
    };

    componentDidMount() {
        this.showFAB();
    }

    showFAB = () => {
        const {isShown, buttonClassName} = this.state;
        if (this.refs.createFAB.props.className === 'add-button') {
            this.setState({buttonClassName: 'add-button show', isShown: !isShown})
        } else {
            this.setState({buttonClassName: 'add-button', isShown: !isShown})
        }
    }

    render() {
        const {isShown, buttonClassName} = this.state;
        return (
            <div className='global-layout'>
                <AppBar style={{position: 'fixed'}} className='global-appbar' title="Vibe" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                <div className='separator' />
                {this.props.children}
                <FloatingActionButton ref='createFAB' className={buttonClassName} secondary={true}><ContentAdd /></FloatingActionButton>
                {!isShown ? this.showFAB : null}
            </div>
        )
    }
}

export default Layout;
