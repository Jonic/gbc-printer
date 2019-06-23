import React, { useContext } from 'react'

import AppContext from '../../contexts/App'
import ImageCanvas from '../ImageCanvas/ImageCanvas'

const ImagesList = () => {
  const { printedImages } = useContext(AppContext)

  return (
    <section>
      {printedImages.map(image => {
        return <ImageCanvas pixels={image.pixels} key={image.uuid} />
      })}
    </section>
  )
}

export default ImagesList
