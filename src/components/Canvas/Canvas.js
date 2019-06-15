import React, { useContext, useEffect, useRef } from 'react'

import AppContext from '../../contexts/App'
import { CanvasDrawImage } from '../../helpers/Canvas'
import PropTypes from 'prop-types'

const Canvas = ({ imageData }) => {
  const { ignoreBorder, pixelSize } = useContext(AppContext)
  const imageCanvas = useRef(null)

  const tileSize = 8
  let tilesX = 20
  let tilesY = 18

  if (ignoreBorder) {
    tilesX -= 4
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

Canvas.propTypes = {
  imageData: PropTypes.array.isRequired,
}

export default Canvas
