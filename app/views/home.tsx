import React from 'react';
import {VibeCard} from '../components/card';
import {FlatButton, RaisedButton, CircularProgress} from 'material-ui';
import {Link} from 'react-router';
import i18next from 'i18next';
import {GDriveAPI} from "../actions/google-drive-api";

interface HomeViewProps {
    router?:any;
}

interface HomeViewState {
    articles:boolean;
    isLoading: boolean;
    fileList: any[];
}

export class HomeView extends React.Component<HomeViewProps, HomeViewState> {

    constructor(props) {
        super(props);
        this.state = {
            articles: null,
            isLoading: false,
            fileList: []
        };
    }

    componentDidMount() {
        if(localStorage.getItem('user')) {
            const gDriveAPI = new GDriveAPI(this, "loadList");
            
            gDriveAPI.loadDriveApi();
        } else this.props.router.push('/');
    }

    downloadArticle = (id) => {
        console.log('Downloading articles n°',  id);
    }

    consultArticle = (id) => {
        this.props.router.push(`article/${id}`);
    }

    renderCards = () => {
        const {articles, isLoading, fileList} = this.state;
        const articlesArray = [];
        if(fileList[0] && fileList[0].length > 0) {
            fileList[0].forEach(file => {
                articlesArray.push(
                    <VibeCard
                        file={file} key={file.id}
                        buttonsProps={{
                            primary: {label: 'button.download', action: this.downloadArticle}, secondary: {label: "button.consult", action: this.consultArticle}
                        }} />
                )
            })
            return <div id='home-cards-container'>{articlesArray}</div>
        }
        return(
            <div id='home-cards-container-empty'>
                {this.state.isLoading && <CircularProgress size={80} thickness={5} />}
                {fileList[0] && fileList[0].length === 0 && !isLoading && <span>{i18next.t('articles.empty')}</span>}
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
