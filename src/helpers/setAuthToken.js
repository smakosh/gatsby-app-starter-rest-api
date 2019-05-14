import axios from 'axios'

export default token => {
  if (token) {
    axios.defaults.headers.common['x-auth'] = token
  } else {
    delete axios.defaults.headers.common['x-auth']
  }
}
