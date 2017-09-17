import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import {FlatButton, RaisedButton, CircularProgress, FloatingActionButton, FontIcon} from 'material-ui';
import {Link, RouteComponentProps, InjectedRouter} from 'react-router';
import i18next from 'i18next';
import "./article-consult.scss";
import {VibeCarousel} from '../../components/carousel/index';
import {AudioMediaCarouselItem} from '../../components/carousel/music-item/index';

interface MusicListProps {
    list: {
        url: string
    }[]
}

export class MusicList extends React.Component<MusicListProps, {}> {

    render() {

        return (
            <div className="music-list">
                {this.props.list && 
                    this.props.list.map(song => {
                        return (
                            <audio controls preload="none">
                                <source src={song.url} type="audio/mpeg" />>
                                Your browser does not support the audio element.
                            </audio>
                        )
                    })
                }
            </div>
        );
    }
}
