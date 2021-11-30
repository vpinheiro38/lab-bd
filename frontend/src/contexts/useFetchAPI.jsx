import {
  useEffect,
  useState
} from "react"
import axios from 'axios'
import { toast } from "react-toastify"

export default function useFetchAPI({ url, method, disableSuccessNotification }) {
  const [response, setResponse] = useState()
  const [fetching, setFetching] = useState(false)

  const fetchAPI = ({ data, queries, useAxios, mockResponse }) => {
    if (useAxios) {
      const urlQuery = queries ? `?${queries.join('&')}` : ''
      const axiosUrl = `http://localhost:3001/${url}${urlQuery}`

      axios({
        url: axiosUrl, method, data,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        }
      }).then((response) => {
        setResponse(response.message ? response : response.data)
        setFetching(false)
      })
      setFetching(true)
    } else {
      setResponse({ message: 'Requisição mockada', success: true, data: mockResponse })
    }
    
  }

  useEffect(() => {
    if (!response) return

    if (!disableSuccessNotification && response.success) toast.success(response.message)
    else if (!response.success) toast.error(response.message)
  }, [response])

  return [fetchAPI, response]
}
