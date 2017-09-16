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
import {MusicList} from './music-list';

interface ArticleConsultViewProps {
    router?: InjectedRouter;
    params?: any;
}

interface ArticleConsultViewState {
    article : any;
    isShown : boolean;
    downloadButtonClassName : string;
}

export class ArticleConsultationView extends React.Component < ArticleConsultViewProps,
ArticleConsultViewState > {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            isShown: false,
            downloadButtonClassName: "download-button"
        };
    }

    list = [
        {
            name: "Ténor",
            src: "https://drive.google.com/uc?id=0BzK7hmJUEgKnd2JfajFEcXdGalk&export=download",
            img: "https://assets.hauteculture.com/uploads/22781/500x500.16661100405919a6eba2c67.png",
            comments: "Ténor"
        }, {
            name: "Soprano",
            src: "https://drive.google.com/uc?id=0BzK7hmJUEgKnd2JfajFEcXdGalk&export=download",
            img: "https://assets.hauteculture.com/uploads/22781/500x500.16661100405919a6eba2c67.png",
            comments: "Soprano"
        }, {
            name: "Alto",
            src: "https://drive.google.com/uc?id=0BzK7hmJUEgKnd2JfajFEcXdGalk&export=download",
            img: "https://assets.hauteculture.com/uploads/22781/500x500.16661100405919a6eba2c67.png",
            comments: "Alto"
        }, {
            name: "Tous",
            src: "https://drive.google.com/uc?id=0BzK7hmJUEgKnd2JfajFEcXdGalk&export=download",
            img: "https://assets.hauteculture.com/uploads/22781/500x500.16661100405919a6eba2c67.png",
            comments: "Tous"
        }
    ];

    componentDidMount() {
        if (!localStorage.getItem('user')) {
            this
                .props
                .router
                .push('/');
        }
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.setState({
                downloadButtonClassName: 'download-button show',
                isShown: !this.state.isShown
            })
        }, 350);
    }

    componentWillUnmount() {
        this.setState({
            downloadButtonClassName: 'download-button',
            isShown: !this.state.isShown
        })
    }

    render() {

        return (
            <div className='consulted-article'>
                <div className="song-pdf">
                    <iframe src={`https://drive.google.com/file/d/${this.props.params.id}/preview`}></iframe>
                    <FloatingActionButton
                        ref="floatingDownloadButton"
                        className={this.state.downloadButtonClassName}
                        href={`https://drive.google.com/uc?id=${this.props.params.id}&export=download`}
                        style={{
                        position: "relative",
                        top: "-5%",
                        left: "50%"
                    }}>
                        <FontIcon className="material-icons">file_download</FontIcon>
                    </FloatingActionButton>
                </div>
                <div className="song-carousel">
                    {/* <VibeCarousel
                        contentSize={{
                        height: 450,
                        width: "70%"
                    }}
                        list={[
                            {
                                name: "Chant de la page",
                                src: "https://drive.google.com/uc?id=0BzK7hmJUEgKnd2JfajFEcXdGalk&export=download",
                                img: "https://assets.hauteculture.com/uploads/22781/500x500.16661100405919a6eba2c67.png",
                                comments: "Ténor"
                            }, {
                                name: "Chant de la page",
                                src: "https://drive.google.com/uc?id=0BzK7hmJUEgKnd2JfajFEcXdGalk&export=download",
                                img: "https://assets.hauteculture.com/uploads/22781/500x500.16661100405919a6eba2c67.png",
                                comments: "Ténor"
                            }, {
                                name: "Chant de la page",
                                src: "https://drive.google.com/uc?id=0BzK7hmJUEgKnd2JfajFEcXdGalk&export=download",
                                img: "https://assets.hauteculture.com/uploads/22781/500x500.16661100405919a6eba2c67.png",
                                comments: "Ténor"
                            }, {
                                name: "Chant de la page",
                                src: "https://drive.google.com/uc?id=0BzK7hmJUEgKnd2JfajFEcXdGalk&export=download",
                                img: "https://assets.hauteculture.com/uploads/22781/500x500.16661100405919a6eba2c67.png",
                                comments: "Ténor"
                            }
                        ]}
                    SlideComponent={AudioMediaCarouselItem}/> */}
                        <MusicList list={this.list} />
                </div>
            </div>
        );
    }
}
