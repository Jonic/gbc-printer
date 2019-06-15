import React, { useContext, useRef } from 'react'

import AppContext from '../../contexts/App'
import testData from '../../config/testData'

const DataInput = () => {
  const { setIgnoreBorder, setSourceImageData } = useContext(AppContext)

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
        <input
          onChange={event => setIgnoreBorder(event.value)}
          type="checkbox"
        />
        Ignore Borders?
      </p>
      <button>DO IT</button>
    </form>
  )
}

export default DataInput
