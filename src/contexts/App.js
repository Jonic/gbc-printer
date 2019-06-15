import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { cameraDataProcess } from '../helpers/CameraData'
import { trackPageView } from '../helpers/Analytics'

const fn = () => {}

const AppContext = React.createContext({
  ignoreBorder: false,
  isLoading: true,
  processedImageData: [],
  setIgnoreBorder: fn,
  setIsLoading: fn,
  setProcessedImageData: fn,
  setSourceImageData: fn,
  sourceImageData: null,
})

const AppContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [ignoreBorder, setIgnoreBorder] = useState(false)
  const [processedImageData, setProcessedImageData] = useState([])
  const [sourceImageData, setSourceImageData] = useState(null)

  const pixelSize = 4

  useEffect(trackPageView)

  useEffect(() => {
    if (!sourceImageData) {
      return
    }

    const cameraDataHelperOutput = cameraDataProcess(sourceImageData)
    setProcessedImageData(cameraDataHelperOutput)
  }, [sourceImageData])

  const contextValue = {
    ignoreBorder,
    isLoading,
    pixelSize,
    processedImageData,
    setIgnoreBorder,
    setIsLoading,
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
