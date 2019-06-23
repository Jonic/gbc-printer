import React, { useContext, useEffect, useRef } from 'react'

import AppContext from '../../contexts/App'
import { CanvasDrawImage } from '../../helpers/Canvas'
import PropTypes from 'prop-types'

const ImageCanvas = ({ pixels }) => {
  const { ignoreBorder, pixelSize } = useContext(AppContext)
  const imageCanvas = useRef(null)
  const imageElement = useRef(null)

  useEffect(() => {
    const canvas = imageCanvas.current
    const image = imageElement.current

    CanvasDrawImage({
      canvas,
      ignoreBorder,
      image,
      pixels,
      pixelSize,
    })
  }, [ignoreBorder, imageCanvas, imageElement, pixels, pixelSize])

  return (
    <React.Fragment>
      <img alt="" ref={imageElement} src="" />
      <canvas ref={imageCanvas} />
    </React.Fragment>
  )
}

ImageCanvas.propTypes = {
  pixels: PropTypes.array.isRequired,
}

export default ImageCanvas
