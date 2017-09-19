import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import {
    FlatButton,
    RaisedButton,
    CircularProgress,
    FloatingActionButton,
    FontIcon,
    Paper
} from 'material-ui';
import {Link, RouteComponentProps, InjectedRouter} from 'react-router';
import i18next from 'i18next';
import "./article-consult.scss";
import {VibeCarousel} from '../../components/carousel/index';
import {AudioMediaCarouselItem} from '../../components/carousel/music-item/index';
import {MusicList} from './music-list';
import {GDriveAPI} from '../../actions/google-drive-api';

interface ArticleConsultViewProps {
    router?: InjectedRouter;
    params?: any;
}

interface ArticleConsultViewState {
    article : any;
    isShown : boolean;
    downloadButtonClassName : string;
    fileList: any[];

}

export class ArticleConsultationView extends React.Component < ArticleConsultViewProps,
ArticleConsultViewState > {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            isShown: false,
            downloadButtonClassName: "download-button",
            fileList: []
        };
    }

    componentDidMount() {
        if (!localStorage.getItem('user')) {
            this.props.router.push('/');
        }
        const gDriveAPI = new GDriveAPI(this, "loadMusics");
        gDriveAPI.loadDriveApi();

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
        const test: React.CSSProperties = {justifyContent: "center"}

        const style = {
            height: "70%",
            width: "70%",
            padding: 20,
            textAlign: 'center',
            display: 'flex',
            justifyContent: test.justifyContent,
          };

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
                    <div style={style}>
                        <VibeCarousel
                            contentSize={{
                                height: "59%",
                                width: 70
                            }}
                            list={this.setFileList()}
                            SlideComponent={AudioMediaCarouselItem}/>
                            {/* <MusicList list={this.list} /> */}

                    </div>
                </div>
            </div>
        );
    }

    setFileList() {
        let listToSend = [];
        this.state.fileList.forEach(file => {
            listToSend.push({
                url: `https://drive.google.com/uc?id=${file.id}&export=download`,
                name: file.name.split(".")[0],
                comment: file.description
            })
        })
        return listToSend;
    }
}
