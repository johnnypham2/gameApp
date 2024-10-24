// this will hold the logic from usePlatforms custom hook

import usePlatforms from "./usePlatforms";


const usePlatform = (id?: number) => {
    const { data: platforms} = usePlatforms();
    return platforms?.results.find((p) => p.id === id)
}
export default usePlatform