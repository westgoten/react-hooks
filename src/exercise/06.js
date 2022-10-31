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
  const [isLoading, setLoading] = React.useState(false)
  const [pokemonName, setPokemonName] = React.useState()

  async function handleSubmit(newPokemonName) {
    try {
      if (newPokemonName !== pokemonName) {
        setLoading(true)
        setPokemonName(newPokemonName)
        const newPokemon = await fetchPokemon(newPokemonName)
        setPokemon(newPokemon)
      }
    } catch (error) {
      console.error(error)
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
