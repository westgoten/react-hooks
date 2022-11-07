// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  PokemonDataView,
  fetchPokemon,
  PokemonInfoFallback,
} from '../pokemon'

const requestStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
}

function PokemonInfo({pokemon}) {
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemon, setPokemon] = React.useState()
  const [pokemonName, setPokemonName] = React.useState()
  const [error, setError] = React.useState(null)
  const [status, setStatus] = React.useState(requestStatus.IDLE)

  async function handleSubmit(newPokemonName) {
    try {
      if (newPokemonName !== pokemonName) {
        setStatus(requestStatus.PENDING)
        setPokemonName(newPokemonName)
        const newPokemon = await fetchPokemon(newPokemonName)
        setPokemon(newPokemon)
        setStatus(requestStatus.RESOLVED)
      }
    } catch (error) {
      setError(error)
      setStatus(requestStatus.REJECTED)
    }
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {status === requestStatus.PENDING ? (
          <PokemonInfoFallback name={pokemonName} />
        ) : status === requestStatus.REJECTED ? (
          <div role="alert">
            There was an error:{' '}
            <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
          </div>
        ) : status === requestStatus.RESOLVED ? (
          <PokemonInfo pokemon={pokemon} />
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

export default App
