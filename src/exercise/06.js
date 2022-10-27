// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

import {PokemonForm, PokemonDataView, fetchPokemon} from '../pokemon'

function PokemonInfo({pokemon}) {
  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemon, setPokemon] = React.useState()

  async function handleSubmit(newPokemonName) {
    try {
      const newPokemon = await fetchPokemon(newPokemonName)
      setPokemon(newPokemon)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {pokemon ? <PokemonInfo pokemon={pokemon} /> : 'Submit a pokemon'}
      </div>
    </div>
  )
}

export default App
