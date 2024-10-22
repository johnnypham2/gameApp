// import { useEffect, useState } from "react";
// import apiClient from "../services/apiClient";
// import { CanceledError } from "axios";
// import { Platform } from "./useGames";
// import useData from "./useData";
// import apiClient from "../services/apiClient";

import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_GENRES } from "../constants";
import APIClient, { FetchResponse } from "../services/apiClient";


// export interface Genre {
//   id: number;
//   name: string;
// }

const apiClient = new APIClient<Genre>('/genres');

//help us shaping our data in the form of our interfaces(type) props to pass data from parent component to child
export interface Genre {
  id: number;
  name: string;
  image_background: string;

}

// export interface FetchGenresResponse <T> {
//   count: number;
//   results: T[];
// }


const useGenres = () => useQuery<FetchResponse<Genre>>({
  queryKey: CACHE_KEY_GENRES,
  queryFn: () => 
              apiClient.getall({}),
  staleTime: 24 * 60 * 60 * 1000 // 24 hours before refresh
})

export default useGenres;










// //We need our useStates to help us render update our UI with our Genress and others
// const [genres, setGenres] = useState<Genre[]>([]);
// const [error, setError] = useState("");
// const [isLoading, setIsLoading] = useState(false);

// //Create a helper function to help us fetch our code


// ///UseEffect to fetch our data

// useEffect(() => {

//   //We need an instance of AbortController() to help us unsubscribe to the api, we are going to save it variable
//   const controller = new AbortController();
//   setIsLoading(true);

//   apiClient
//     .get<FetchGenresResponse>("/genres", { signal: controller.signal })
//     .then((response) => {
//       setIsLoading(false)
//       setGenres(response.data.results)


//     })
//     .catch((error) => {
//       if (error instanceof CanceledError) return
//       setIsLoading(true)
//       setError(error.message);
//       setIsLoading(false)
//     });

//   return () => controller.abort();

// }, []);

// return { genres, error,isLoading }