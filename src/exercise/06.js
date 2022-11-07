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
  const [pokemonName, setPokemonName] = React.useState()
  const [state, setState] = React.useState({
    status: requestStatus.IDLE,
    pokemon: null,
    error: null,
  })

  async function handleSubmit(newPokemonName) {
    try {
      if (newPokemonName !== pokemonName) {
        setState({status: requestStatus.PENDING})
        setPokemonName(newPokemonName)
        const pokemon = await fetchPokemon(newPokemonName)
        setState({status: requestStatus.RESOLVED, pokemon})
      }
    } catch (error) {
      setState({status: requestStatus.REJECTED, error})
    }
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {state.status === requestStatus.PENDING ? (
          <PokemonInfoFallback name={pokemonName} />
        ) : state.status === requestStatus.REJECTED ? (
          <div role="alert">
            There was an error:{' '}
            <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
          </div>
        ) : state.status === requestStatus.RESOLVED ? (
          <PokemonInfo pokemon={state.pokemon} />
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

export default App
