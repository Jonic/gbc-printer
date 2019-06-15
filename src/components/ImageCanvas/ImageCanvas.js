import React, { useContext, useEffect, useRef } from 'react'

import AppContext from '../../contexts/App'
import { CanvasDrawImage } from '../../helpers/Canvas'
import PropTypes from 'prop-types'

const ImageCanvas = ({ imageData }) => {
  const { ignoreBorder, pixelSize } = useContext(AppContext)
  const imageCanvas = useRef(null)

  const tileSize = 8
  let tilesX = 20
  let tilesY = 18

  if (ignoreBorder) {
    // eslint-disable-next-line no-magic-numbers
    tilesX -= 4
    // eslint-disable-next-line no-magic-numbers
    tilesY -= 4
  }

  const canvasHeight = tilesY * tileSize * pixelSize
  const canvasWidth = tilesX * tileSize * pixelSize

  useEffect(() => {
    imageCanvas &&
      CanvasDrawImage({
        ignoreBorder,
        imageCanvas,
        imageData,
        pixelSize,
      })
  }, [ignoreBorder, imageCanvas, imageData, pixelSize])

  return <canvas height={canvasHeight} ref={imageCanvas} width={canvasWidth} />
}

ImageCanvas.propTypes = {
  imageData: PropTypes.array.isRequired,
}

export default ImageCanvas
