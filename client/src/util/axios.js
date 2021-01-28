import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://localhost:5000'
})

export default instance

// This creates an instance of axios with a baseURL, to cut down on repetitious typing
// This is an alternative to proxy in `package.json`, but for different use case
