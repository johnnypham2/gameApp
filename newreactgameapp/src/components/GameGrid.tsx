// all of our imports we need

// import { useEffect, useState } from "react"
// import apiClient from "../services/apiClient"
// import { Genre } from "../hooks/useGenres"
// import { Platform } from "../hooks/usePlatforms"
import { Button, SimpleGrid, Text } from "@chakra-ui/react"
import useGames from "../hooks/useGames"
import GameCard from "./GameCard"
import GameCardSkeleton from "./GameCardSkeleton"
import GameCardContainer from "./GameCardContainer"
import { GameQuery } from "../App"
import React from "react"

// sent to useGames.ts
// stuff here

// props to pass data from parent component to child component 

interface Props {
//refactored
  // selectedGenre: Genre | null;
  // selectedPlatform: Platform | null;
  gameQuery: GameQuery
}

const GameGrid = ({gameQuery}:Props) => {

   // we have cut the usestate , our fetch, and useEffect and place them into our custom hook
   // and now we simply use our custom hook useGames() hook
   const {data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} = useGames(gameQuery);

    const skeleton = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    // we may have other helper functions to add, delete or update data
  return (
    <>
        {/* display our data  ul  and li grid table usually a map with a unique key */}
        {/*  remember to use {} to do any logic */}
                                      {/* every {1} is equal to 4 pixels */}
        <SimpleGrid columns={{sm:1,md:2,lg:3,xl:4}} 
                    spacing={3} 
                    padding={5}
                    // padding={"20px"}
                    >  
            {isLoading && skeleton.map(skeleton => 
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton/>
            </GameCardContainer>
            
            )}

            {data?.pages.map((page,index) => 
                <React.Fragment key={index}>
                  {page.results.map(game => 
                  <GameCardContainer key={game.id}>
                    <GameCard game={game} >{}</GameCard>
                  </GameCardContainer>
                  )}
                </React.Fragment>
            )}

        </SimpleGrid>
        {hasNextPage && <Button onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'Loading...' : 'Load More'}</Button>}

        {/* render errors */}
        {error && <Text color={"red"}>{error.message}</Text>}
    </>
  )
}

export default GameGrid