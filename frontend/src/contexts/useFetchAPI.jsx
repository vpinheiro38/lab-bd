import {
  useState
} from "react"
import axios from 'axios'

export default function useFetchAPI({ url, method }) {
  const [response, setResponse] = useState()
  const [fetching, setFetching] = useState(false)

  const fetchAPI = ({ data, mockResponse }) => {
    // axios({
    //   url: `localhost:3000/${url}`, method, data
    // }).then((response) => {
    //   setResponse(response)
    //   setFetching(false)
    // })
    // setFetching(true)
    setResponse({ message: 'Requisição mockada', success: true, data: mockResponse })
  }

  return [fetchAPI, response]
}
