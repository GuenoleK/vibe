import React, {Component} from 'react';
import {FlatButton} from 'material-ui';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles = {
  container: {
    padding: 50,
    display: 'flex'
  },
  flexItem: {
    marginRight: 10
  }
};

class Home extends Component {

  render() {
    return (
      <div style={styles.container}>
        <h3>Hello</h3>
      </div>
    );
  }
}

export default Home;
