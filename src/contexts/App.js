import React, { useEffect, useState } from 'react'

import CameraDataParser from '../classes/CameraDataParser'
import PropTypes from 'prop-types'
import { trackPageView } from '../helpers/Analytics'

const fn = () => {}

const AppContext = React.createContext({
  cameraData: null,
  ignoreBorder: false,
  imageData: [],
  isLoading: true,
  pixelSize: 5,
  setCameraData: fn,
  setIgnoreBorder: fn,
  setImageData: fn,
  setIsLoading: fn,
  setPixelSize: fn,
})

const AppContextProvider = ({ children }) => {
  const [cameraData, setCameraData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [ignoreBorder, setIgnoreBorder] = useState(true)
  const [imageData, setImageData] = useState([])
  // eslint-disable-next-line no-magic-numbers
  const [pixelSize, setPixelSize] = useState(5)

  useEffect(trackPageView)

  useEffect(() => {
    if (!cameraData) {
      return
    }

    const parsedImageData = new CameraDataParser({ cameraData })
    setImageData(parsedImageData)
  }, [cameraData])

  const contextValue = {
    cameraData,
    ignoreBorder,
    imageData,
    isLoading,
    pixelSize,
    setCameraData,
    setIgnoreBorder,
    setImageData,
    setIsLoading,
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
