import {
  useEffect,
  useState
} from "react"
import axios from 'axios'
import { toast } from "react-toastify"

export default function useFetchAPI({ url, method, disableSuccessNotification }) {
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

  useEffect(() => {
    if (!response) return

    if (!disableSuccessNotification && response.success) toast.success(response.message)
    else if (!response.success) toast.error(response.message)
  }, [response])

  return [fetchAPI, response]
}
