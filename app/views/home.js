import React, {PureComponent} from 'react';
import {VibeCard} from '../components/card';
import {FlatButton, RaisedButton, CircularProgress} from 'material-ui';
import {Link} from 'react-router';
import {loadArticles} from '../services/articles-services';
import i18next from 'i18next';

export class HomeView extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            isLoading: false
        };
    }

    callLoadArticles = () => {
        this.setState({isLoading: true}, () => {
            setTimeout(() => {
                loadArticles().then(data => this.setState({articles: data.length < 1 ? null : data, isLoading: false}));
            }, 1000);
        })
    }

    componentDidMount() {
        if(localStorage.getItem('user')) {
            this.callLoadArticles();
        } else this.props.router.push('/');
    }

    downloadArticle = (id) => {
        console.log('Downloading articles n°',  id);
    }

    consultArticle = (id) => {
        console.log('Going to articles n°',  id);
        this.props.router.push(`article/${id}`);
    }

    renderCards = () => {
        const {articles, isLoading} = this.state;
        const articlesArray = [];
        if(articles) {
            articles.forEach(article => {
                articlesArray.push(
                    <VibeCard
                    article={article} key={article.id}
                    primaryButtonProps={{label: 'button.download', action: this.downloadArticle}}
                    secondaryButtonProps={{label: 'button.consult', action: this.consultArticle}} />
                )
            })
            return <div id='home-cards-container'>{articlesArray}</div>
        }
        return(
            <div id='home-cards-container-empty'>
                {this.state.isLoading && <CircularProgress size={80} thickness={5} />}
                {!articles && !isLoading && <span>{i18next.t('articles.empty')}</span>}
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
