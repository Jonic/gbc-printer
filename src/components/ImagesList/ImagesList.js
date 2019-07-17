import './ImagesList.scss'

import React, { useContext } from 'react'

import AppContext from '../../contexts/App'
import ImageCanvas from '../ImageCanvas/ImageCanvas'

const ImagesList = () => {
  const { printedImages, setPrintedImages } = useContext(AppContext)

  const removeImage = removalIndex => {
    const images = printedImages.filter(
      (_item, index) => index !== removalIndex,
    )
    setPrintedImages(images)
  }

  return (
    <section className="c-images-list">
      {printedImages.map((image, index) => {
        return (
          <figure className="c-images-list__item" key={image.uuid}>
            <ImageCanvas index={index + 1} pixels={image.pixels} />
            <button onClick={_event => removeImage(index)}>&times;</button>
          </figure>
        )
      })}
    </section>
  )
}

export default ImagesList
