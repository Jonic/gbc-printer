import React, { useContext } from 'react'

import AppContext from '../../contexts/App'

const DevModeToggle = () => {
  const { isDevMode, setIsDevMode } = useContext(AppContext)

  return (
    <div>
      <p>
        <input
          checked={isDevMode}
          onChange={event => setIsDevMode(event.target.checked)}
          type="checkbox"
        />
        Dev Mode? ({isDevMode ? 'Yes' : 'No'})
      </p>
      <p>
        Currently this just adds extra stuff to the processed data so I can see
        what's going on.
      </p>
    </div>
  )
}

export default DevModeToggle
