import useData from "./useData"


//help us shape our data in the form of our interfaces (type) props to pass data from parent component to child
export interface Genre {
    id: number
    name: string
    image_background:string
}
const useGenres = () => useData<Genre>('/genres')
   
     
export default useGenres;