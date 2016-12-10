import React, {Component} from 'react';
import {AppBar} from 'material-ui';
import 'material-design-lite/material';

class Layout extends Component {

    render() {
        return (
            <div>
                <AppBar title="Title" iconClassNameRight="muidocs-icon-navigation-expand-more" />
                {this.props.children}
            </div>
        )
    }
}

export default Layout;
