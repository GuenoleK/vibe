import React, {PureComponent} from 'react';
import {FlatButton, RaisedButton} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import serverCaller from '../services/test_service';
import {Link} from 'react-router';
import {loadArticles} from '../services/articles-services';
import {loadUser} from '../services/user-services';
import i18next from 'i18next';

export class HomeView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            user: null
        };
    }

    componentDidMount() {
        loadArticles().then(data => this.setState({articles: data}));
    }

    renderCards = () => {
        const {articles} = this.state;
        const articlesArray = [];
        if(articles) {
            articles.forEach(article => {
                articlesArray.push(
                    <div data-vibe='card' key={article.id}>
                        <Card>
                            <CardMedia overlay={<CardTitle title={article.title} className='card-overlay' />} >
                                <img src='http://previews.123rf.com/images/rastudio/rastudio1505/rastudio150500060/39497815-Musical-note-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-Vector-dark-grey-icon-Stock-Vector.jpg'/>
                            </CardMedia>
                            <CardText className='card-text'>
                                {article.description}
                            </CardText>
                            <CardActions>
                                <FlatButton label={i18next.t('button.download')} />
                                <FlatButton label={i18next.t('button.consult')} />
                            </CardActions>
                        </Card>
                    </div>
                )
            })
            return <div id='home-cards-container'>{articlesArray}</div>
        }
        return(
            <div id='home-cards-container-empty'>
                <span>{i18next.t('articles.empty')}</span>
            </div>
        )
    }

    render() {
        return (
            <div className='home-container'>
                {this.renderCards()}
            </div>
        );
    }
}
