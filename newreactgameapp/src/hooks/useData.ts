import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosRequestConfig, CanceledError } from "axios";

// create the shape of the interface of the parent platform
export interface Platform {
    id: number;
    name: string;
    slug: string;
}
//help us shape our data in the form of our interfaces (type) props to pass data from parent component to child
interface FetchResponse<T> {
    count: number
    results: T []
}
const useData =<T> (endpoint: string,requestConfig?:AxiosRequestConfig,deps?:any[]) => {
    //useStates to help us render update our UI with our games and others
const [data, setData] = useState<T[]>([]);
const [error, setError] = useState();
const [isLoading, setIsLoading] = useState(false);
//create a helper function to help us fetch our code
// '/games' is our endpoint

//useEffect to fetch our data
useEffect(() => {
    //we need an instance of AbortController to help us unsubscribe to the api, we are going to save it 
    const controller = new AbortController();
    setIsLoading(true);

    apiClient.get<FetchResponse<T>>(endpoint ,{signal: controller.signal,...requestConfig})
    .then(response => {
        setIsLoading(false)
        setData(response.data.results)} )
    .catch(error => {
        if(error instanceof CanceledError) return
        setIsLoading(true);
        setError(error.message)
        setIsLoading(false)
    })
    return () => controller.abort();
    
},deps ? [...deps] :[])

return {data, error, isLoading}
}      
export default useData;