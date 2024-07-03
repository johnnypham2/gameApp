import { Button, HStack, Image, List, ListItem, Spinner,  } from "@chakra-ui/react";
import useData from "../hooks/useData";
import { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/imageUrl";

interface Props {
    onSelectedGenre: (genre:Genre) => void
    selectedGenre: Genre | null
}

const GenreList = ({onSelectedGenre,selectedGenre}:Props) => {

    const {data, isLoading} = useData<Genre>('/genres')

  return (
    <>
        <List>
            {isLoading && <Spinner/>}
            {data.map((genre) => <ListItem marginBottom={10} key={genre.id}>
            <HStack>
                <Image objectFit={'cover'} boxSize={16} borderRadius={4} src={getCroppedImageUrl(genre.image_background)}/>
                <Button color={genre.id === selectedGenre?.id ? 'bold': 'normal'} fontSize={'lg'} variant={'link'} onClick={() => onSelectedGenre(genre)}>{genre.name}</Button>
            </HStack>
            </ListItem>)}
        </List>
    </>
  )
}

export default GenreList