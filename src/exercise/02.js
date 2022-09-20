// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName, error] = useLocalStorageState(initialName, 'name')

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
      <br />
      {error && <span style={{color: 'red'}}>{error}</span>}
    </div>
  )

  function handleChange(event) {
    setName(event.target.value)
  }
}

export const useLocalStorageState = (initialState, key = 'state') => {
  const [state, setState] = React.useState(getInitialState)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    try {
      const stateJSON = JSON.stringify(state)
      localStorage.setItem(key, stateJSON)
    } catch {
      setError('Houve um erro ao salvar os dados')
    }
  }, [state, key])

  function getInitialState() {
    try {
      const storedItemJSON = localStorage.getItem(key)
      return storedItemJSON ? JSON.parse(storedItemJSON) : initialState
    } catch {
      return initialState
    }
  }

  return [state, setState, error]
}

function App() {
  return <Greeting />
}

export default App
