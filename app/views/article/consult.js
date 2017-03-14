import React, {PureComponent} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {FlatButton, RaisedButton} from 'material-ui';
import {Link} from 'react-router';
import {loadArticle} from '../../services/articles-services';
import i18next from 'i18next';

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

    render() {
        const {article} = this.state;
        return (
            <div className='consulted-article'>
                {article &&
                    <div data-vibe='consult-card'>
                        <Card style={{width: '80%'}}>
                            <CardHeader
                                title={article.title}
                                subtitle={article.description}
                                avatar="images/jsa-128.jpg"
                                />
                            <CardText>
                                {article.corpus}
                            </CardText>
                            <CardActions>
                                <FlatButton label={i18next.t('button.download')} onClick={() => this.downloadArticle(article.id)} />
                            </CardActions>
                        </Card>
                    </div>
                }
            </div>
        );
    }
}
