import React, { useContext } from 'react'

import AppContext from '../../contexts/App'
import ImageCanvas from '../ImageCanvas/ImageCanvas'

const ImagesList = () => {
  const { parsedCameraData } = useContext(AppContext)

  return (
    parsedCameraData && (
      <section>
        {parsedCameraData.images.map(imageData => {
          return <ImageCanvas imageData={imageData} key={imageData.uuid} />
        })}
      </section>
    )
  )
}

export default ImagesList
