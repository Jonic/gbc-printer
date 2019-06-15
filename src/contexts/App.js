import React, { useEffect, useState } from 'react'

import CameraDataParser from '../classes/CameraDataParser'
import PropTypes from 'prop-types'
import { trackPageView } from '../helpers/Analytics'

const fn = () => {}

const AppContext = React.createContext({
  ignoreBorder: false,
  isLoading: true,
  pixelSize: 5,
  processedImageData: [],
  setIgnoreBorder: fn,
  setIsLoading: fn,
  setPixelSize: fn,
  setProcessedImageData: fn,
  setSourceImageData: fn,
  sourceImageData: null,
})

const AppContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [ignoreBorder, setIgnoreBorder] = useState(true)
  const [processedImageData, setProcessedImageData] = useState([])
  const [sourceImageData, setSourceImageData] = useState(null)
  const [pixelSize, setPixelSize] = useState(5)

  useEffect(trackPageView)

  useEffect(() => {
    if (!sourceImageData) {
      return
    }

    const cameraDataHelperOutput = new CameraDataParser({
      cameraData: sourceImageData,
    })

    setProcessedImageData(cameraDataHelperOutput)
  }, [sourceImageData])

  const contextValue = {
    ignoreBorder,
    isLoading,
    pixelSize,
    processedImageData,
    setIgnoreBorder,
    setIsLoading,
    setPixelSize,
    setProcessedImageData,
    setSourceImageData,
    sourceImageData,
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppContext
export { AppContextProvider }
