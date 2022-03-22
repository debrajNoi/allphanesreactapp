// Constants.js
const prod = {
 url: {
  API_URL: 'http://localhost:8000/AllphanesuserAdd'
 }
}

const dev = {
 url: {
  API_URL: 'http://localhost:8000/AllphanesuserAdd'
 }
}
export const config = process.env.NODE_ENV === 'development' ? dev : prod