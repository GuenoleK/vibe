import React, {PureComponent} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {FlatButton, RaisedButton, CircularProgress} from 'material-ui';
import {Link} from 'react-router';
import {loadArticle} from '../../services/articles-services';
import i18next from 'i18next';
import moment from 'moment';

export class ArticleConsultationView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            article: null
        };
    }

    componentDidMount() {
        if(localStorage.getItem('user')) {
            loadArticle(this.props.params.id).then(data => this.setState({article: data}));
        } else this.props.router.push('/');
    }

    downloadArticle = (id) => {
        console.log('Download article n°', id);
    }

    convertArticleValues = () => {
        let {article} = this.state;
        return {decodedTablature: new Buffer(this.state.article.tablature, 'base64').toString('binary'), reformatCreateDate: moment(article.createdAt).format('DD/MM/YYYY')}
    }

    render() {
        const {article} = this.state;
        console.log(this.state);
        let convertedValues = {}
        if(article) {
            convertedValues = this.convertArticleValues();
        }

        return (
            <div className='consulted-article'>
                {article &&
                    <div data-vibe='consult-card'>
                        <Card style={{width: '60%'}}>
                            <CardHeader
                                title={'Guénolé Kikabou'}
                                subtitle={`${i18next.t('card.publishedAt')} ${convertedValues.reformatCreateDate}`}
                                avatar='https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_account_circle_black_36px.svg'
                                />
                            <CardMedia
                                overlay={<CardTitle title={article.title} subtitle={article.description} />}
                                >
                                <img className='article-consult-tablature' src={`data:image/png;base64,${convertedValues.decodedTablature}`} />
                            </CardMedia>
                            <CardText>
                                <div className='article-consult-corpus'>
                                    {article.corpus}
                                </div>
                            </CardText>
                            <CardActions>
                                <FlatButton label={i18next.t('button.download')} onClick={() => this.downloadArticle(article.id)} />
                            </CardActions>
                        </Card>
                    </div>
                }
                {!article && <div data-vibe='article-consult-loading'><CircularProgress size={80} thickness={5} /></div>}
            </div>
        );
    }
}
