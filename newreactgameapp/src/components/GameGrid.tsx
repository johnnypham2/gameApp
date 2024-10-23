// all of our imports we need

// import { useEffect, useState } from "react"
// import apiClient from "../services/apiClient"
// import { Genre } from "../hooks/useGenres"
// import { Platform } from "../hooks/usePlatforms"
import { Button, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import useGames from "../hooks/useGames"
import GameCard from "./GameCard"
import GameCardSkeleton from "./GameCardSkeleton"
import GameCardContainer from "./GameCardContainer"
import { GameQuery } from "../App"
import React from "react"
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
//refactored
  // selectedGenre: Genre | null;
  // selectedPlatform: Platform | null;
  gameQuery: GameQuery
}

const GameGrid = ({gameQuery}:Props) => {

   
   const {data, error, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage} = useGames(gameQuery);

    const skeleton = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

   const fetchedGameCount = data?.pages.reduce((total,page) => total + page.results.length,0) || 0

  return (
    <>
       <InfiniteScroll
       dataLength={fetchedGameCount}
       hasMore={!!hasNextPage}
       next={() => fetchNextPage()}
       loader={<Spinner/>}
       >

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
            </InfiniteScroll>
        {hasNextPage && <Button onClick={() => fetchNextPage()}>{isFetchingNextPage ? 'Loading...' : 'Load More'}</Button>}

        {/* render errors */}
        {error && <Text color={"red"}>{error.message}</Text>}
    </>
  )
}

export default GameGrid