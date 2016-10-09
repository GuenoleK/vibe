import fetch from 'isomorphic-fetch';

export const loadFinance = async () => {
  const response = await fetch(`http://localhost:9999/api/helloworld`)
  const data = await response.json();
  document.write(data)
  return console.lo(data);
}
