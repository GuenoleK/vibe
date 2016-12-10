"use strict";
import fetch from 'isomorphic-fetch';

async function serverCaller() {
  const response = await fetch(`http://localhost:9999/api/helloworld`);
  response.text().then((data) => {
    console.log(data);
  })
}

export default serverCaller;
