import { GameQuery } from "../App";
import useData from "./useData";
// create the shape of the interface of the parent platform
export interface Platform {
    id: number;
    name: string;
    slug: string;
}
//help us shape our data in the form of our interfaces (type) props to pass data from parent component to child
export interface Game {
    parent_platforms: {
        platform: Platform
    }[];
    id: number
    name: string
    background_image: string
    metacritic:number
}
export interface FetchGameResponse {
    count: number
    results: Game []
}
const useGames = (gameQuery:GameQuery) => useData<Game>('/games',{params:{genres:gameQuery.genre?.id,parent_platforms:gameQuery.platform?.id,ordering:gameQuery.sortOrder,search:gameQuery.searchText}},[gameQuery])

export default useGames;