// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName = '', ...props}) {
  const [name, setName] = React.useState(initialName)

  return (
    <div {...props}>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )

  function handleChange(event) {
    setName(event.target.value)
  }
}

function App() {
  return <Greeting initialName="Rodrigo" />
}

export default App
