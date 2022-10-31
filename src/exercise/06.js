// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {
  PokemonForm,
  PokemonDataView,
  fetchPokemon,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemon}) {
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemon, setPokemon] = React.useState()
  const [pokemonName, setPokemonName] = React.useState()
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  async function handleSubmit(newPokemonName) {
    try {
      if (newPokemonName !== pokemonName) {
        setLoading(true)
        setError(null)
        setPokemonName(newPokemonName)
        const newPokemon = await fetchPokemon(newPokemonName)
        setPokemon(newPokemon)
      }
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {isLoading ? (
          <PokemonInfoFallback name={pokemonName} />
        ) : error ? (
          <div role="alert">
            There was an error:{' '}
            <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
          </div>
        ) : pokemon ? (
          <PokemonInfo pokemon={pokemon} />
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

export default App
