import { useEffect, useState } from "react"
import apiClient from "./services/apiClient"
import { Text } from "@chakra-ui/react"


//help us shape our data in the form of our interfaces (type) props to pass data from parent component to child
interface Game {
    id: number
    name: string
}

interface FetchGameResponse {
    count: number
    results: Game []
}

const GameGrid = () => {

//useStates to help us render update our UI with our games and others
const [games, setGames] = useState<Game[]>([]);
const [error, setError] = useState();

//create a helper function to help us fetch our code
// '/games' is our endpoint
const fetchGames = () => {
    apiClient.get('/gamess')
    .then(response => setGames(response.data.results))
    .catch(error => {
        setError(error.message)
    })
}

//useEffect to fetch our data
useEffect(() => {

fetchGames();
    
}, [])


  return (
    <>
    <ul>
        {games.map(game => <li key={game.id}>{game.name}</li>)}
    </ul>
    {error && <Text color={'red'}>{error}</Text>}
    </>
  )
}

export default GameGrid