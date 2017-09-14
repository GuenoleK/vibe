import React, {PureComponent} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {FlatButton, RaisedButton, CircularProgress, FloatingActionButton, FontIcon} from 'material-ui';
import {Link} from 'react-router';
import {loadArticle} from '../../services/articles-services';
import i18next from 'i18next';
import moment from 'moment';
import "./article-consult.scss";

export class ArticleConsultationView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            isShown: false,
            downloadButtonClassName: "download-button"
        };
    }

    componentDidMount() {
        if(!localStorage.getItem('user')) {
            this.props.router.push('/');
        }
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.setState({downloadButtonClassName: 'download-button show', isShown: !this.state.isShown})
        }, 400);
    }

    componentWillUnmount() {
        this.setState({downloadButtonClassName: 'download-button', isShown: !this.state.isShown})
    }

    convertArticleValues = () => {
        let {article} = this.state;
        return {decodedTablature: new Buffer(article.tablature, 'base64'), reformatCreateDate: moment(article.createdAt).format('DD/MM/YYYY')}
    }

    render() {
        const {article} = this.state;
        let convertedValues = {}
        if(article) {
            convertedValues = this.convertArticleValues();
        }

        return (
            <div className='consulted-article'>
                <div className="song-pdf">
                    <iframe src={`https://drive.google.com/file/d/${this.props.params.id}/preview`}>
                    </iframe>
                    <FloatingActionButton
                        ref="floatingDownloadButton"
                        className={this.state.downloadButtonClassName}
                        alt="Télécharger"
                        primary 
                        href={`https://drive.google.com/uc?id=${this.props.params.id}&export=download`}
                        style={{position: "relative", top: "-5%", left: "50%"}}>
                        <FontIcon className="material-icons">file_download</FontIcon>
                    </FloatingActionButton>
                </div>
                <div className="song-carousel">
                    carousel here
                </div>
            </div>
        );
    }
}
