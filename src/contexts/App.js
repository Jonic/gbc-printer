/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react'

import Printer from '../classes/Printer'
import PropTypes from 'prop-types'
import { trackCameraDataProcess } from '../helpers/Analytics'

const fn = () => {}

const AppContext = React.createContext({
  cameraData: '',
  ignoreBorder: true,
  isDevMode: false,
  isLoading: true,
  pixelSize: 5,
  printedImages: [],
  setCameraData: fn,
  setIgnoreBorder: fn,
  setIsDevMode: fn,
  setIsLoading: fn,
  setPixelSize: fn,
  setPrintedImages: fn,
})

const AppContextProvider = ({ children }) => {
  const [cameraData, setCameraData] = useState('')
  const [ignoreBorder, setIgnoreBorder] = useState(true)
  const [isDevMode, setIsDevMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pixelSize, setPixelSize] = useState(5)
  const [printedImages, setPrintedImages] = useState([])

  useEffect(() => {
    if (!cameraData) {
      return
    }

    const printerData = new Printer({ cameraData, ignoreBorder })
    trackCameraDataProcess()
    setPrintedImages(printerData.images)
  }, [cameraData, ignoreBorder, isDevMode])

  const contextValue = {
    cameraData,
    ignoreBorder,
    isDevMode,
    isLoading,
    pixelSize,
    printedImages,
    setCameraData,
    setIgnoreBorder,
    setIsDevMode,
    setIsLoading,
    setPixelSize,
    setPrintedImages,
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
