import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import { cameraDataProcess } from '../helpers/CameraData'
import { trackPageView } from '../helpers/Analytics'

const fn = () => {}

const AppContext = React.createContext({
  imageData: null,
  isLoading: true,
  setImageData: fn,
  setIsLoading: fn,
})

const AppContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [processedImageData, setProcessedImageData] = useState([])
  const [sourceImageData, setSourceImageData] = useState('')

  useEffect(() => trackPageView(), [])

  useEffect(() => {
    const cameraDataHelperOutput = cameraDataProcess(sourceImageData)
    setProcessedImageData(cameraDataHelperOutput)
  }, [sourceImageData])

  const contextValue = {
    isLoading,
    processedImageData,
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
