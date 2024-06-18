import { useEffect, useState } from "react";
import apiClient from "../components/services/apiClient";
import { CanceledError } from "axios";
//help us shape our data in the form of our interfaces (type) props to pass data from parent component to child
export interface Game {
    id: number
    name: string
    background_image: string
}
interface FetchGameResponse {
    count: number
    results: Game []
}
const useGames = () => {
    //useStates to help us render update our UI with our games and others
const [games, setGames] = useState<Game[]>([]);
const [error, setError] = useState();

//create a helper function to help us fetch our code
// '/games' is our endpoint

//useEffect to fetch our data
useEffect(() => {
    //we need an instance of AbortController to help us unsubscribe to the api, we are going to save it 
    const controller = new AbortController();

    apiClient.get<FetchGameResponse>('/games',{signal: controller.signal})
    .then(response => setGames(response.data.results))
    .catch(error => {
        if(error instanceof CanceledError) return
        setError(error.message)
    })
    return () => controller.abort();
    
}, [])

return {games, error}
}      
export default useGames;