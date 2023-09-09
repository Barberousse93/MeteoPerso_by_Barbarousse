import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    console.log('refresh')
    try {
      setIsLoading(true)
      const response = await fetch(url)
      // console.log(response)
      const newData = await response.json()
      // console.log(newData)
      setData(newData)
      // console.log(data)
    } catch (error) {
      alert(error.message)
      setError(error)
    } finally {
      setIsLoading(false)
      // console.log('fetch data', data, typeof data)
    }
  }
  return { data, isLoading, error, fetchData }
}

export default useFetch
