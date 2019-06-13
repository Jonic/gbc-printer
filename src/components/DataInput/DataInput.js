import React, { useContext, useRef } from 'react'

import AppContext from '../../contexts/App'

const DataInput = () => {
  const { setSourceImageData } = useContext(AppContext)

  const inputElement = useRef(null)

  return (
    <section>
      <textarea ref={inputElement} />
      <button onClick={() => setSourceImageData(inputElement.current.value)}>
        DO IT
      </button>
    </section>
  )
}

export default DataInput
