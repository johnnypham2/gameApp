import { SimpleGrid, Text } from "@chakra-ui/react"
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";



const GameGrid = () => {
const {games, error} = useGames();

  return (
    <>
    <SimpleGrid>
        {games.map(game => <GameCard game={game} key={game.id}></GameCard>)}
    </SimpleGrid>
    {error && <Text color={'red'}>{error}</Text>}
    </>
  )
}

export default GameGrid