import './App.scss'

import AppContext, { AppContextProvider } from 'contexts/App'
import React, { useContext } from 'react'

import classnames from 'classnames'

const App = () => {
  const { isLoading } = useContext(AppContext)
  const cAppClassNames = classnames(['c-app', isLoading && 'c-app--is-loading'])

  return (
    <AppContextProvider>
      <main className={cAppClassNames}>
        <h1 className="c-app__title">Gameboy Camera Printer</h1>
      </main>
    </AppContextProvider>
  )
}

export default App
