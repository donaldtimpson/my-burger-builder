import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-builder-2-d2c54-default-rtdb.firebaseio.com/',
})

export default instance