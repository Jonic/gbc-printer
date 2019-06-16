import React, { useContext, useEffect, useRef } from 'react'

import AppContext from '../../contexts/App'
import testData from '../../config/testData'
import { trackImageRender } from '../../helpers/Analytics'

const CameraDataForm = () => {
  const {
    ignoreBorder,
    pixelSize,
    setIgnoreBorder,
    setPixelSize,
    setCameraData,
  } = useContext(AppContext)
  const dataElement = useRef(null)

  useEffect(trackImageRender)

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        setCameraData(dataElement.current.value)
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

export default CameraDataForm
