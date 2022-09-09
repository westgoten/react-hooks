// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(getInitialName)

  React.useEffect(() => {
    localStorage.setItem('name', name)
  }, [name])

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )

  function getInitialName() {
    return localStorage.getItem('name') ?? initialName
  }

  function handleChange(event) {
    setName(event.target.value)
  }
}

function App() {
  return <Greeting />
}

export default App
