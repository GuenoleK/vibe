import React, {PureComponent} from 'react';
import {FlatButton, RaisedButton} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Link} from 'react-router';
import i18next from 'i18next';

export const VibeCard = ({file, primaryButtonProps, secondaryButtonProps}) => {
    return(
        <div data-vibe='card'>
            <Card>
                <CardMedia overlay={<CardTitle title={file.name} className='card-overlay' />} >
                    <img src='http://previews.123rf.com/images/rastudio/rastudio1505/rastudio150500060/39497815-Musical-note-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-Vector-dark-grey-icon-Stock-Vector.jpg'/>
                </CardMedia>
                <CardText className='card-text' style={{padding: "16px 16px 0px 16px"}}>
                    {file.description}
                </CardText>
                <CardActions>
                    <FlatButton label={i18next.t(primaryButtonProps.label)} onClick={() => primaryButtonProps.action(file.id)} />
                    <FlatButton label={i18next.t(secondaryButtonProps.label)} onClick={() => secondaryButtonProps.action(file.id)}/>
                </CardActions>
            </Card>
        </div>
    );
}
