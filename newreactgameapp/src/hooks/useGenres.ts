import { useQuery } from "@tanstack/react-query"
import useData from "./useData"
import { CACHE_KEY_GENRES } from "../constants"
import apiClient from "../services/apiClient"


//help us shape our data in the form of our interfaces (type) props to pass data from parent component to child
export interface Genre {
    id: number
    name: string
    image_background:string
}

interface FetchGameResponse <T>  {
    count: number
    results: T[];
}

const useGenres = () => useQuery({
    queryKey: CACHE_KEY_GENRES,
    queryFn: () => apiClient.get<FetchGameResponse<Genre>>("/genres").then(res => res.data)
})
   
     
export default useGenres;