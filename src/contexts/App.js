import React, { useEffect, useState } from 'react'

import CameraDataParser from '../classes/CameraDataParser'
import PropTypes from 'prop-types'
import { trackCameraDataProcess } from '../helpers/Analytics'

const fn = () => {}

const AppContext = React.createContext({
  cameraData: null,
  ignoreBorder: false,
  isLoading: true,
  parsedCameraData: [],
  pixelSize: 5,
  setCameraData: fn,
  setIgnoreBorder: fn,
  setIsLoading: fn,
  setParsedCameraData: fn,
  setPixelSize: fn,
})

const AppContextProvider = ({ children }) => {
  const [cameraData, setCameraData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [ignoreBorder, setIgnoreBorder] = useState(true)
  const [parsedCameraData, setParsedCameraData] = useState(null)
  // eslint-disable-next-line no-magic-numbers
  const [pixelSize, setPixelSize] = useState(5)

  useEffect(() => {
    if (!cameraData) {
      return
    }

    const cameraDataParserResult = new CameraDataParser({ cameraData })
    trackCameraDataProcess()
    setParsedCameraData(cameraDataParserResult)
  }, [cameraData])

  const contextValue = {
    cameraData,
    ignoreBorder,
    isLoading,
    parsedCameraData,
    pixelSize,
    setCameraData,
    setIgnoreBorder,
    setIsLoading,
    setParsedCameraData,
    setPixelSize,
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
