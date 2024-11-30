const express = require('express')
const axios = require('axios')

const PORT = 8005
const VALID_PROTOCOLS = ['http:', 'https:']

const axiosInstance = axios.create({
  validateStatus: () => true,
  responseType: 'stream'
})

const isValidUrl = (url) => {
  try {
    const { protocol } = new URL(url)
    return VALID_PROTOCOLS.includes(protocol)
  } catch {
    return false
  }
}

const forwardHeaders = (sourceHeaders, targetHost) => ({
  ...sourceHeaders,
  host: targetHost
})

const handleProxyRequest = async (req, res) => {
  const targetUrl = decodeURIComponent(req.path.substring(1))
  
  if (!isValidUrl(targetUrl)) {
    return res.status(418).json({ msg: 'invalid' })
  }

  try {
    const { host } = new URL(targetUrl)
    const response = await axiosInstance({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: forwardHeaders(req.headers, host),
      params: req.query
    })

    res.status(response.status)
    // Object.entries(response.headers).forEach(([key, value]) => {
    //   res.set(key, value)
    // })
    response.data.pipe(res)
  } catch (error) {
    res.status(500).json({
      error: 'Network Error',
      message: error.message,
      details: error.code || 'Unknown error'
    })
  }
}


const app = express()
app.use(express.json())
app.all('*', handleProxyRequest)

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`)
})
