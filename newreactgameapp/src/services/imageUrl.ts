import noImage from '../assets/no-image-placeholder-6f3882e0.webp'


const getCroppedImageUrl = (url: string) => {

    if(!url) return noImage
    const target = 'media/'

    //SAVING media in target then getting the length indexOf and the length of it
    const index = url.indexOf(target) + (target).length

    //using slice by getting the whole url starting with 0 and ending with index ^ then adding 'crop/600/400/
    return url.slice(0,index) + 'crop/600/400/' + url.slice(index)
}

export default getCroppedImageUrl