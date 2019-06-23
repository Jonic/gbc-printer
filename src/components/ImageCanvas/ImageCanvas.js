import React, { useContext, useEffect, useRef } from 'react'

import AppContext from '../../contexts/App'
import { CanvasDrawImage } from '../../helpers/Canvas'
import PropTypes from 'prop-types'

const ImageCanvas = ({ pixels }) => {
  const { ignoreBorder, pixelSize } = useContext(AppContext)
  const imageCanvas = useRef(null)

  useEffect(() => {
    CanvasDrawImage({
      ignoreBorder,
      imageCanvas,
      pixels,
      pixelSize,
    })
  }, [ignoreBorder, imageCanvas, pixels, pixelSize])

  return <canvas ref={imageCanvas} />
}

ImageCanvas.propTypes = {
  pixels: PropTypes.array.isRequired,
}

export default ImageCanvas
