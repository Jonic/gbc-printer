import React, { useContext } from 'react'

import AppContext from '../../contexts/App'
import Canvas from '../Canvas/Canvas'

const DataInput = () => {
  const { imageData } = useContext(AppContext)

  return (
    <section>
      {imageData.map(imageData => (
        <Canvas imageData={imageData} key={imageData} />
      ))}
    </section>
  )
}

export default DataInput
