import './App.scss'

import AppContext, { AppContextProvider } from 'contexts/App'
import React, { useContext, useEffect } from 'react'

import CameraDataForm from './CameraDataForm/CameraDataForm'
import ImagesList from './ImagesList/ImagesList'
import classnames from 'classnames'
import { trackPageView } from '../helpers/Analytics'

const App = () => {
  const { isLoading } = useContext(AppContext)
  useEffect(trackPageView)

  const cAppClassNames = classnames(['c-app', isLoading && 'c-app--is-loading'])

  return (
    <AppContextProvider>
      <main className={cAppClassNames}>
        <h1 className="c-app__title">Gameboy Camera Printer</h1>
        <CameraDataForm />
        <ImagesList />
      </main>
    </AppContextProvider>
  )
}

export default App
