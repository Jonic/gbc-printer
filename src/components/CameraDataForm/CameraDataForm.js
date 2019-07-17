import './CameraDataForm.scss'

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
      className="c-camera-data-form"
      onSubmit={event => {
        event.preventDefault()
        setCameraData(dataElement.current.value)
      }}
    >
      <textarea
        className="c-camera-data-form__textarea"
        cols="50"
        defaultValue={testData}
        ref={dataElement}
        rows="15"
      />

      <p className="c-camera-data-form__option">
        <label className="c-camera-data-form__label">
          Set Pixel Size:
          <input
            className="c-camera-data-form__input--range"
            defaultValue={pixelSize}
            max="20"
            min="1"
            onChange={event => setPixelSize(event.target.value)}
            type="range"
          />{' '}
          {pixelSize}px
        </label>
      </p>

      <p className="c-camera-data-form__option">
        <label className="c-camera-data-form__label">
          <input
            checked={ignoreBorder}
            className="c-camera-data-form__input"
            onChange={event => setIgnoreBorder(event.target.checked)}
            type="checkbox"
          />
          Ignore Borders? ({ignoreBorder ? 'Yes' : 'No'})
        </label>
      </p>

      <button>DO IT</button>
    </form>
  )
}

export default CameraDataForm
