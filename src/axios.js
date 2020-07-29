// axios
import axios from 'axios'

const domain = "https://cors-anywhere.herokuapp.com/http://ea-makers.mitc.vn"

export default axios.create({
  baseURL:domain
  // You can add your headers here
})


