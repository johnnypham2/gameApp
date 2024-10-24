import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { BsChevronCompactDown } from "react-icons/bs"
import usePlatforms, { Platform } from "../hooks/usePlatforms"
import usePlatform from "../hooks/usePlatform"

interface Props {
    onSelectPlatform: (platform: Platform) => void
    selectedPlatformId?: number
}

const PlatformSelector = ({onSelectPlatform, selectedPlatformId}:Props) => {

    const {data, error} = usePlatforms();

    // const selectedPlatform = data?.results.find((p) => p.id === selectedPlatformId)
    //// now call our usePlatform hook
    const selectedPlatform = usePlatform(selectedPlatformId)

     if(error) return

  return (
    <>
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronCompactDown/>} >{selectedPlatform?.name || 'Platform'}</MenuButton>
            <MenuList>
                {data?.results.map((platform) => <MenuItem onClick={() => onSelectPlatform(platform)} key={platform.id}>{platform.name}</MenuItem>)}
            </MenuList>
        </Menu>
    </>
  )
}

export default PlatformSelector