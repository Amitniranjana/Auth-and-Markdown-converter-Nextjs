'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const Page = () => {
  // State ko null se initialize karna better hai agar object aane wala ho
  const [weatherData, setWeatherData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const[city ,setCity]=useState('')

  const handler = async () => {
    setLoading(true)
    try {
      // Axios call ke aage await lagana zaroori hai
      // Agar backend ko city chahiye, toh wo 2nd parameter me bhej sakte hain
      const response = await axios.post('/api/dashboard', { city: city })

      // Axios me actual response data "response.data" ke andar hota hai
      setWeatherData(response.data)
      console.log("Weather Data:", response.data)

    } catch (error) {
      console.error("Fetch failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    // h-100vh ki jagah h-screen use kiya hai
    <div className='flex flex-col justify-center items-center h-screen gap-6'>
<input value={city} onChange={(event)=>setCity(event.target.value)} type="text" />
      <Button
        onClick={handler}
        variant={"destructive"}

      >
        {loading ? 'Fetching...' : 'Get Weather'}
      </Button>

      {/* Jab data fetch ho jayega, toh yahan screen par dikhega */}
      {weatherData && (
        <div className="p-4 border border-gray-300 rounded-lg shadow-sm w-80 text-center">
          <h2 className="font-bold text-xl mb-2">Result</h2>
          {/* JSON.stringify use karke object ko screen par dikha rahe hain */}
          <pre className="text-left text-sm  p-2 rounded overflow-auto">
            {JSON.stringify(weatherData.data?.current || weatherData, null, 2)}
          </pre>
        </div>
      )}

    </div>
  )
}

export default Page