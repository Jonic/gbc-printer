import ReactGA from 'react-ga'
import config from 'config/analytics'

const init = () => {
  // console.log('Analytics#init') // eslint-disable-line no-console
  ReactGA.initialize(config.id)
}

const trackCameraDataProcess = () => {
  const event = {
    action: 'Camera Data Process',
    category: 'Data',
  }

  // console.log('Data#trackCameraDataProcess', event) // eslint-disable-line no-console
  ReactGA.event(event)
}

const trackImageRender = () => {
  const event = {
    action: 'Image Render',
    category: 'Image',
  }

  // console.log('Image#trackImageRender', event) // eslint-disable-line no-console
  ReactGA.event(event)
}

const trackPageView = () => {
  // console.log('Analytics#trackPageView') // eslint-disable-line no-console
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export { init, trackCameraDataProcess, trackImageRender, trackPageView }
