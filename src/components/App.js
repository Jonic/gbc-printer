import './App.scss'

import AppContext, { AppContextProvider } from 'contexts/App'
import React, { useContext } from 'react'

import DataInput from './DataInput/DataInput'
import ImageOutput from './ImageOutput/ImageOutput'
import classnames from 'classnames'

const App = () => {
  const { isLoading } = useContext(AppContext)
  const cAppClassNames = classnames(['c-app', isLoading && 'c-app--is-loading'])

  return (
    <AppContextProvider>
      <main className={cAppClassNames}>
        <h1 className="c-app__title">Gameboy Camera Printer</h1>
        <div>
          <DataInput />
        </div>
        <div>
          <ImageOutput />
        </div>
      </main>
    </AppContextProvider>
  )
}

export default App
