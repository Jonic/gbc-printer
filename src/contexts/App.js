import React, { useEffect, useState } from 'react'

import CameraDataParser from '../classes/CameraDataParser'
import PropTypes from 'prop-types'
import { trackCameraDataProcess } from '../helpers/Analytics'

const fn = () => {}

const AppContext = React.createContext({
  cameraData: null,
  ignoreBorder: false,
  isDevMode: false,
  isLoading: true,
  parsedCameraData: [],
  pixelSize: 5,
  setCameraData: fn,
  setIgnoreBorder: fn,
  setIsDevMode: fn,
  setIsLoading: fn,
  setParsedCameraData: fn,
  setPixelSize: fn,
})

const AppContextProvider = ({ children }) => {
  const [cameraData, setCameraData] = useState(null)
  const [isDevMode, setIsDevMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [ignoreBorder, setIgnoreBorder] = useState(true)
  const [parsedCameraData, setParsedCameraData] = useState(null)
  // eslint-disable-next-line no-magic-numbers
  const [pixelSize, setPixelSize] = useState(5)

  useEffect(() => {
    if (!cameraData) {
      return
    }

    const cameraDataParserResult = new CameraDataParser({
      cameraData,
      ignoreBorder,
      isDevMode,
    })

    trackCameraDataProcess()
    setParsedCameraData(cameraDataParserResult)
  }, [cameraData, ignoreBorder, isDevMode])

  const contextValue = {
    cameraData,
    ignoreBorder,
    isDevMode,
    isLoading,
    parsedCameraData,
    pixelSize,
    setCameraData,
    setIgnoreBorder,
    setIsDevMode,
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
