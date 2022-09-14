// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName, 'name')

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )

  function handleChange(event) {
    setName(event.target.value)
  }
}

export const useLocalStorageState = (initialState = '', key = 'state') => {
  const [state, setState] = React.useState(getInitialState)

  React.useEffect(() => {
    localStorage.setItem(key, state)
  }, [state, key])

  function getInitialState() {
    return localStorage.getItem(key) ?? initialState
  }

  return [state, setState]
}

function App() {
  return <Greeting />
}

export default App
