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
    <ErrorBoundary Fallback={ErrorFallback} onRetry={onRetry}>
      <div className="pokemon-info-app">
        <PokemonForm onSubmit={handleSubmit} />
        <hr />
        <div className="pokemon-info">
          {state.status === requestStatus.PENDING ? (
            <PokemonInfoFallback name={pokemonName} />
          ) : state.status === requestStatus.REJECTED ? (
            <ThrowError error={state.error.message} />
          ) : state.status === requestStatus.RESOLVED ? (
            <PokemonInfo pokemon={state.pokemon} />
          ) : (
            'Submit a pokemon'
          )}
        </div>
      </div>
    </ErrorBoundary>
  )

  function onRetry() {
    setState({status: requestStatus.IDLE})
  }
}

function ThrowError(error) {
  if (error) {
    throw error
  }
  return null
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {error: null}
    this.onRetry = this.onRetry.bind(this)
  }

  static getDerivedStateFromError(error) {
    return {error}
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error)
    console.log('ErrorInfo:', errorInfo)
  }

  onRetry() {
    this.props.onRetry()
    this.setState({error: null})
  }

  render() {
    const {Fallback} = this.props
    if (this.state.error) {
      return <Fallback error={this.state.error.error} onRetry={this.onRetry} />
    }

    return this.props.children
  }
}

function ErrorFallback({error, onRetry}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>
        {error ?? 'Oops, something went wrong'}
      </pre>
      <button onClick={onRetry}>Try again</button>
    </div>
  )
}

export default App
