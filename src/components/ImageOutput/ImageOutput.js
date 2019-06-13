import React, { useContext, useEffect } from 'react'

import AppContext from '../../contexts/App'

const DataInput = () => {
  const { processedImageData } = useContext(AppContext)

  useEffect(() => {
    console.log({ processedImageData })
  }, [processedImageData])

  return <section>{processedImageData}</section>
}

export default DataInput
