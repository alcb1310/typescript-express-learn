import { Photo } from "../models/photo-entity"
import { PhotoMetadata } from "../models/photo-metadata-entity"
import { AppDataSource } from "../db"

const photoRepository = AppDataSource.getRepository(Photo)
const metadataRepository = AppDataSource.getRepository(PhotoMetadata)

export const createPhoto = async (photoToCreate: any) => {
    const { name, description, filename, views, isPublished } = photoToCreate

    try{
        const photo = new Photo()

        photo.name = name
        photo.description = description
        photo.filename = filename
        photo.views = views
        photo.isPublished = isPublished

        await AppDataSource.manager.save(photo)

        // create a photo metadata
        const metadata = new PhotoMetadata()
        metadata.height = 640
        metadata.width = 480
        metadata.compressed = true
        metadata.comment = "cybershoot"
        metadata.orientation = "portrait"
        metadata.photo = photo // this way we connect them
        await metadataRepository.save(metadata)

        return photo
    } catch (err){
        return null
    } 
}

export const getOnePhotoById = async (id: number) => {
    const photo: Photo | null = await photoRepository.findOneBy({
        id: Number(id)
    })

    return photo
}

export const getAllPhotos = async (published:boolean | undefined) => {
    const allPhotos: Photo[] = published === undefined ?  await (await photoRepository.find({ 
        relations: {
            metadata: true
        }
    })) : await photoRepository.findBy({isPublished: published})
    

    return allPhotos
}

export const updateAPhoto = async (id: number, updatePhotoValues: any) => {
    try {
        const photoToUpdate: Photo | null = await photoRepository.findOneBy({
            id: Number(id)
        })
        
        if (!photoToUpdate) return undefined
    
        photoToUpdate.name = updatePhotoValues.name
        photoToUpdate.description = updatePhotoValues.description
        photoToUpdate.filename = updatePhotoValues.filename
        photoToUpdate.views = updatePhotoValues.views
        photoToUpdate.isPublished = updatePhotoValues.isPublished
    
        await photoRepository.save(photoToUpdate)
        
        return photoToUpdate
    } catch (error) {
        return null
    }
}

export const deletePhoto = async (id: number) => {
    const photoToRemove: Photo | null = await photoRepository.findOneBy({
        id: Number(id)
    })

    if (!photoToRemove) return false

    await photoRepository.remove(photoToRemove)

    return true
}