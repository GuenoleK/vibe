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
            isLoading: false,
            fileList: []
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
            // this.callLoadArticles();
            this.loadDriveApi();
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
        const {articles, isLoading, fileList} = this.state;
        const articlesArray = [];
        if(fileList[0] && fileList[0].length > 0) {
            fileList[0].forEach(file => {
                articlesArray.push(
                    <VibeCard
                    file={file} key={file.id}
                    primaryButtonProps={{label: 'button.download', action: this.downloadArticle}}
                    secondaryButtonProps={{label: 'button.consult', action: this.consultArticle}} />
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

    // Client ID and API key from the Developer Console
    get CLIENT_ID() {return '368161403578-nbcekh8dfui30up5muhp2bkvob6rvsne.apps.googleusercontent.com';}
    get API_KEY() {return 'AIzaSyDnxv91bVQMD2Gyd6gj-ptKKdOx40uF1b8'};

    // Array of API discovery doc URLs for APIs used by the quickstart
    get DISCOVERY_DOCS() {return ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];}

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    get SCOPES() {return 'https://www.googleapis.com/auth/drive.metadata.readonly';}

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient = () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: this.DISCOVERY_DOCS,
        scope: this.SCOPES
      }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        this.listFiles();
      } else {
        gapi.auth2.getAuthInstance().signIn();
      }
    }

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Print files.
     */
    listFiles = () => {
        this.setState({isLoading: true}, () => {
            gapi.client.drive.files.list({
              'pageSize': 100,
              q: "parents in '0BzK7hmJUEgKnem1QWjlfTFhYSGs'",
              'fields': "nextPageToken, files(id, name, parents)"
            })
              .then((response) => { return response.result.files})
                  .then(file => this.setState({fileList: [file], isLoading: false}));
        })
    }

    loadDriveApi = () => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        script.async = true;
    
        script.onload = () => {
            gapi.load( gapi.load('client:auth2', this.initClient));
        }
    
        document.body.appendChild(script);
      }

    render() {
        return (
            <div className='home-container'>
                {this.renderCards()}
            </div>
        );
    }
}
