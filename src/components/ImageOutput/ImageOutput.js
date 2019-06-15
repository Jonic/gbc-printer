import React, { useContext } from 'react'

import AppContext from '../../contexts/App'
import Canvas from '../Canvas/Canvas'

const DataInput = () => {
  const { processedImageData } = useContext(AppContext)

  return (
    <section>
      {processedImageData.map(imageData => (
        <Canvas imageData={imageData} key={imageData} />
      ))}
    </section>
  )
}

export default DataInput
