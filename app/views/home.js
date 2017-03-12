import React, {PureComponent} from 'react';
import {FlatButton, RaisedButton} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import serverCaller from '../services/test_service';
import {Link} from 'react-router';
import {loadArticles} from '../services/articles-services';
import {loadUser} from '../services/user-services';

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
                            <CardMedia overlay={<CardTitle title={article.title} subtitle={article.description} />} >
                                <img src='http://previews.123rf.com/images/rastudio/rastudio1505/rastudio150500060/39497815-Musical-note-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-Vector-dark-grey-icon-Stock-Vector.jpg'/>
                            </CardMedia>
                            <CardText>
                                {article.corpus}
                            </CardText>
                            <CardActions>
                                <FlatButton label="Télécharger" />
                                <FlatButton label="Consulter" />
                            </CardActions>
                        </Card>
                    </div>
                )
            })
        }
        return <div id='home-cards-container'>{articlesArray}</div>
    }

    render() {
        console.log(this.state);
        return (
            <div className='home-container'>
                {this.renderCards()}
            </div>
        );
    }
}
