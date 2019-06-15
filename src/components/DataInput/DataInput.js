import React, { useContext, useRef } from 'react'

import AppContext from '../../contexts/App'
import testData from '../../config/testData'

const DataInput = () => {
  const {
    ignoreBorder,
    pixelSize,
    setIgnoreBorder,
    setPixelSize,
    setSourceImageData,
  } = useContext(AppContext)

  const dataElement = useRef(null)

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        setSourceImageData(dataElement.current.value)
      }}
    >
      <textarea cols="50" defaultValue={testData} ref={dataElement} rows="15" />
      <p>
        Set Pixel Size:
        <input
          defaultValue={pixelSize}
          max="20"
          min="1"
          onChange={event => setPixelSize(event.target.value)}
          type="number"
        />
      </p>
      <p>
        <input
          checked={ignoreBorder}
          onChange={event => setIgnoreBorder(event.target.checked)}
          type="checkbox"
        />
        Ignore Borders? ({ignoreBorder ? 'Yes' : 'No'})
      </p>
      <button>DO IT</button>
    </form>
  )
}

export default DataInput
