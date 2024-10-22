// import { useEffect, useState } from "react"
// import apiClient from "../services/apiClient"
// import { CanceledError } from "axios"
// import { Genre } from "./useGenres";
// import useData, { FetchResponse } from "./useData";
// import apiClient, { FetchResponse } from "../services/apiClient";
import { GameQuery } from "../App";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CACHE_KEY_GAMES } from "../constants";
import { Platform } from "./usePlatforms";
import APIClient, { FetchResponse } from "../services/apiClient";

const apiClient = new APIClient<Game>("/games");

// create the shape of the interface of the parent platform
//// but now its moved to apiclient

// export interface Platform {
//     id: number;
//     name: string;
//     slug: string;
// }

// help us shape our data in the form of our interfaces (type)
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

export interface FetchGameResponse<T> {
  count: number;
  results: T[];
}

// to do a one liner we dont need the curly braces
// const useGames = (gameQuery:GameQuery) => useData<Game>('/games', {params:{genres:gameQuery.genre?.id, parent_platforms:gameQuery.platform?.id, ordering:gameQuery.sortOrder, search:gameQuery.searchText}}, [gameQuery])

const useGames = (gameQuery: GameQuery) =>

  useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: [CACHE_KEY_GAMES, gameQuery], // notice that because CACHE_KEY_GAMES is an array but we need to pass in the parameter gameQuery so we have , gamequery
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getall({
        params: {
          genres: gameQuery.genre?.id,
          parent_platforms: gameQuery.platform?.id,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText, 
          page: pageParam
        },
      }),
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length + 1
      }

    // () =>
    // apiClient
    //     .get<FetchGameResponse<Game>>('/games', {params:{genres:gameQuery.genre?.id, parent_platforms:gameQuery.platform?.id, ordering:gameQuery.sortOrder, search:gameQuery.searchText}})
    //     .then(res => res.data)
  });

export default useGames;