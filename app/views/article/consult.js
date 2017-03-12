import React, {PureComponent} from 'react';
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
        loadArticle(this.props.params.id).then(data => this.setState({article: data}));
    }

    render() {
        console.log(this.state);
        return (
            <div className='consulted-article'>
                <div>Article here</div>
            </div>
        );
    }
}
