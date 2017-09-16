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
import Audio from 'react-audioplayer';

interface MusicListProps {
    list: {
        name: string;
        src: string;
        img: string;
        comments: string;
    }[]
}

export class MusicList extends React.Component<MusicListProps, {}> {

    render() {

        return (
            <div className="music-list">
                {this.props.list && 
                    this.props.list.map(song => {
                        return (
                            <div data-component="audio-media-item">
                                <Audio className="audio-player" theme={{boxShadow : "3px 3px 3px 0 rgba(0, 0, 0, 0.24)"}} width={600} height={400} playlist={[song]}/>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
