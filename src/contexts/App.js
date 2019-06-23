/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react'

import Printer from '../classes/Printer'
import PropTypes from 'prop-types'
import { trackCameraDataProcess } from '../helpers/Analytics'

const fn = () => {}

const AppContext = React.createContext({
  cameraData: '',
  ignoreBorder: true,
  isLoading: true,
  pixelSize: 5,
  printedImages: [],
  setCameraData: fn,
  setIgnoreBorder: fn,
  setIsLoading: fn,
  setPixelSize: fn,
  setPrintedImages: fn,
})

const AppContextProvider = ({ children }) => {
  const [cameraData, setCameraData] = useState('')
  const [ignoreBorder, setIgnoreBorder] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [pixelSize, setPixelSize] = useState(5)
  const [printedImages, setPrintedImages] = useState([])

  useEffect(() => {
    const printerData = new Printer({ cameraData })
    trackCameraDataProcess()
    setPrintedImages(printerData.images)
  }, [cameraData])

  const contextValue = {
    cameraData,
    ignoreBorder,
    isLoading,
    pixelSize,
    printedImages,
    setCameraData,
    setIgnoreBorder,
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
