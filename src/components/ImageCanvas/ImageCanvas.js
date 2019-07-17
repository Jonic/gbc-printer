import './ImageCanvas.scss'

import React, { useContext, useEffect, useRef, useState } from 'react'

import AppContext from '../../contexts/App'
import { CanvasDrawImage } from '../../helpers/Canvas'
import PropTypes from 'prop-types'

const ImageCanvas = ({ index, pixels }) => {
  const { ignoreBorder, pixelSize } = useContext(AppContext)
  const [canvasData, setCanvasData] = useState(null)
  const [linkHref, setLinkHref] = useState(null)

  const imageCanvas = useRef(null)
  const imageElement = useRef(null)

  useEffect(() => {
    const canvas = imageCanvas.current
    const image = imageElement.current

    const data = CanvasDrawImage({
      canvas,
      ignoreBorder,
      image,
      pixels,
      pixelSize,
    })

    setCanvasData(data)
  }, [ignoreBorder, imageCanvas, imageElement, pixels, pixelSize])

  useEffect(() => {
    setLinkHref(canvasData)
  }, [canvasData])

  return (
    <div className="c-image-canvas">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className="c-image-canvas__link"
        download={`image_${index}.png`}
        href={linkHref}
      >
        <img
          alt=""
          className="c-image-canvas__output"
          ref={imageElement}
          src=""
        />
        <canvas ref={imageCanvas} />
      </a>
    </div>
  )
}

ImageCanvas.propTypes = {
  index: PropTypes.number.isRequired,
  pixels: PropTypes.array.isRequired,
}

export default ImageCanvas
