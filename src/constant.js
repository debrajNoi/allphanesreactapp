// Constants.js
const prod = {
 url: {
  API_URL: 'https://powerful-shelf-35750.herokuapp.com/api/'
 }
}


const dev = {
 url: {
  API_URL: 'http://localhost:8000/api/'
 }
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod
