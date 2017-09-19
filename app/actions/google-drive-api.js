import {orderBy} from "lodash";

export class GDriveAPI {

    _sentComponent;
    _loadFunction;
    _fileId;
    _fileList = [];
    
    // Client ID and API key from the Developer Console
    get CLIENT_ID() {return '476197073951-r1kibqpebr9ui6abhn4gfesjsajpfu0l.apps.googleusercontent.com';}
    get API_KEY() {return 'AIzaSyAjRH1KvVOYYcbBnskRAoL24e9SL0BTUfM'};

    // Array of API discovery doc URLs for APIs used by the quickstart
    get DISCOVERY_DOCS() {return ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];}

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    get SCOPES() {return 'https://www.googleapis.com/auth/drive.metadata.readonly';}

    constructor(sentComponent, loadFunction) {
        this._sentComponent = sentComponent;
        this._loadFunction = loadFunction
    }

    setFileId(fileId) {
        this._fileId = fileId;
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient = () => {
        gapi.client.init({
            apiKey: this.API_KEY,
            clientId: this.CLIENT_ID,
            discoveryDocs: this.DISCOVERY_DOCS,
            scope: this.SCOPES,
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
          switch(this._loadFunction) {
            case "loadList" :
                this.listFiles();
                break;
            case "loadMusics":
                this.loadMusics();
                break;
            default:
                console.warn("Not supported function. SENT FUNCTION NAME", this._loadFunction);
          }
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
     * Get file list from folder and set component list.
     */
    listFiles = () => {
        const id ="0B_BNBXktTj8RMzM2Z3AtNVY0c3M";

        const {fileList} = this._sentComponent.state.fileList;

        this._sentComponent.setState({isLoading: true}, () => {
            setTimeout(() => {
                gapi.client.drive.files.list({
                    pageSize: 100,
                    q: `parents in '${id}'`,
                    fields: "nextPageToken, files(id, name, parents, description)"
                  }).then(response => response.result.files).then(folders => {
                    folders.forEach(folder => {
                        gapi.client.drive.files.list({
                            pageSize: 100,
                            q: `parents in '${folder.id}'`,
                            fields: "nextPageToken, files(id, name, parents, description)"
                        }).then(resp => resp.result.files).then(files => {
                            files.forEach(file => {
                                if(file.name.split(".")[1] === "pdf") {
                                    this._fileList.push(file);
                                    const sentList = fileList ==! undefined ? [...fileList, this._fileList] : [...this._fileList]
                                    this._sentComponent.setState({fileList: orderBy(sentList, ["name"]), isLoading: false});
                                }
                            })
                        });
                    });
                });
            }, 500);
        });
    }

    loadMusics() {
        const {id} = this._sentComponent.props.params;
        const {fileList} = this._sentComponent.state;

        const request = gapi.client.drive.files.get({
            fileId: id,
            fields: "parents"
        }).execute(file => {
            gapi.client.drive.files.list({
                pageSize: 100,
                q: `parents in '${file.parents[0]}'`,
                fields: "nextPageToken, files(id, name, parents, description)"
            }).then(resp => resp.result.files).then(files => {
                files.forEach(file => {
                    if(file.name.split(".")[1] === "mp3") {
                        this._fileList.push(file);
                        const sentList = fileList ==! undefined ? [...fileList, this._fileList] : [...this._fileList]
                        this._sentComponent.setState({fileList: orderBy(sentList, ["name"]), isLoading: false});
                    }
                })
            });
        })
    }

    downloadFile = () => {
        console.log("HELLO");
    }

    loadDriveApi() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        script.async = true;

        script.onload = () => {
            gapi.load( gapi.load('client:auth2', this.initClient));
        }

        document.body.appendChild(script);
    }
}