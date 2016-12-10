import React, {Component} from 'react';
import {FlatButton, RaisedButton} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import serverCaller from '../services/test_service';

class Home extends Component {

  render() {
    return (
      <div>
        <RaisedButton label='server action' secondary={true} style={{margin: '30px'}} onClick={() => serverCaller()} />
        <div id='cards-container'>
          <div data-focus='card'>
            <Card>
              <CardMedia
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                <img src='http://previews.123rf.com/images/rastudio/rastudio1505/rastudio150500060/39497815-Musical-note-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-Vector-dark-grey-icon-Stock-Vector.jpg'/>
              </CardMedia>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa.Aliquam erat volutpat.Nulla facilisi.
                Donec vulputate interdum sollicitudin.Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
          </div>

          <div data-focus='card'>
            <Card>
              <CardMedia
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                <img src='http://previews.123rf.com/images/rastudio/rastudio1505/rastudio150500060/39497815-Musical-note-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-Vector-dark-grey-icon-Stock-Vector.jpg'/>
              </CardMedia>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa.Aliquam erat volutpat.Nulla facilisi.
                Donec vulputate interdum sollicitudin.Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
          </div>

          <div data-focus='card'>
            <Card>
              <CardMedia
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                <img src='http://previews.123rf.com/images/rastudio/rastudio1505/rastudio150500060/39497815-Musical-note-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-Vector-dark-grey-icon-Stock-Vector.jpg'/>
              </CardMedia>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa.Aliquam erat volutpat.Nulla facilisi.
                Donec vulputate interdum sollicitudin.Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
          </div>

          <div data-focus='card'>
            <Card>
              <CardMedia
                overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                <img src='http://previews.123rf.com/images/rastudio/rastudio1505/rastudio150500060/39497815-Musical-note-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-Vector-dark-grey-icon-Stock-Vector.jpg'/>
              </CardMedia>
              <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec mattis pretium massa.Aliquam erat volutpat.Nulla facilisi.
                Donec vulputate interdum sollicitudin.Nunc lacinia auctor quam sed pellentesque.
                Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
              </CardText>
              <CardActions>
                <FlatButton label="Action1" />
                <FlatButton label="Action2" />
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
