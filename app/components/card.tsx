import React from 'react';
import {FlatButton, RaisedButton} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Link} from 'react-router';
import i18next from "i18next";

interface VibeCardProps {
    file: any;
    buttonsProps: {
        primary?: {
            label: string;
            action: Function;
        },
        secondary?: {
            label: string;
            action: Function;
        }
    }
}

export class VibeCard extends React.Component<VibeCardProps, {}> {
    render() {
        const {file, buttonsProps} = this.props
        return(
            <div data-vibe='card'>
                <Card>
                    <CardMedia overlay={<CardTitle title={file.name} />} >
                        <img src='http://previews.123rf.com/images/rastudio/rastudio1505/rastudio150500060/39497815-Musical-note-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-Vector-dark-grey-icon-Stock-Vector.jpg'/>
                    </CardMedia>
                    <CardText className='card-text' style={{padding: "16px 16px 0px 16px"}}>
                        {file.description}
                    </CardText>
                    <CardActions>
                        <FlatButton label={i18next.t(buttonsProps.primary.label)} onClick={() => buttonsProps.primary.action(file.id)} />
                        <FlatButton label={i18next.t(buttonsProps.secondary.label)} onClick={() => buttonsProps.secondary.action(file.id)}/>
                    </CardActions>
                </Card>
            </div>
        );

    }
}