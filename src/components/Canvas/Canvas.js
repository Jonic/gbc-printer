import React, { useContext, useEffect, useRef } from 'react'

import AppContext from '../../contexts/App'
import { CanvasDrawImage } from '../../helpers/Canvas'
import PropTypes from 'prop-types'

const Canvas = ({ imageData }) => {
  const { pixelSize } = useContext(AppContext)
  const imageCanvas = useRef(null)

  const tileSize = 8
  const tilesX = 20
  const tilesY = 18

  const canvasHeight = tilesY * tileSize * pixelSize
  const canvasWidth = tilesX * tileSize * pixelSize

  useEffect(() => {
    imageCanvas &&
      CanvasDrawImage({
        imageCanvas,
        imageData,
        pixelSize,
      })
  }, [imageCanvas, imageData, pixelSize])

  return <canvas height={canvasHeight} ref={imageCanvas} width={canvasWidth} />
}

Canvas.propTypes = {
  imageData: PropTypes.array.isRequired,
}

export default Canvas
