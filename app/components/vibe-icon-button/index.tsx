import React from 'react';
import {IconButton, FontIcon} from 'material-ui';
import {VibeIconButtonProps} from './vibe-icon-button';

export class VibeIconButton extends React.Component < VibeIconButtonProps, {}> {
    render() {
        const {iconName, ...rest} = this.props
        return(
            <IconButton {...rest}>
                <FontIcon className="material-icons">{iconName}</FontIcon>
            </IconButton>
        )
    }
}
