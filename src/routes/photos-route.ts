import { Request, Response, Router } from "express"
import { Photo } from "../models/photo-entity"
import { PhotoMetadata } from "../models/photo-metadata-entity"
import { AppDataSource } from "../db"

const router = Router()

const photoRepository = AppDataSource.getRepository(Photo)
const metadataRepository = AppDataSource.getRepository(PhotoMetadata)

router.post('/', async(req: Request, res: Response) => {
    const { name, description, filename, views, isPublished } = req.body
    
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

    return res.status(201).json({data: photo})
})

router.get('/:id', async (req:Request, res:Response) => {
    const {id} = req.params

    // const photo: Photo | null = await photoRepository.findOneBy({
    //     id: Number(id)
    // })
    const photo: Photo | null = await photoRepository.findOneBy({
        id: Number(id)
    })//.createQueryBuilder("photo").innerJoinAndSelect("photo.metadata", "metadata")

    if (!photo) return res.status(404).json({detail: `No photo found with id: ${id}`})

    return res.json(photo)
    
})


router.get('/',async (req:Request, res: Response) => {
    const { published } = req.query

    const publishedBool: Boolean | undefined = published === undefined ? undefined : published === 'true' ? true : false
    
    // const photoRepository = AppDataSource.getRepository(Photo)

    const allPhotos: Photo[] = published === undefined ?  await (await photoRepository.find({ 
        relations: {
            metadata: true
        }
    })) : await photoRepository.findBy({isPublished: publishedBool})

    return res.json(allPhotos)
})

router.put('/:id',async (req:Request, res: Response) => {
    const {id} = req.params
    const { name, description, filename, views, isPublished } = req.body
    
    // const photoRepository = AppDataSource.getRepository(Photo)
    
    const photoToUpdate: Photo | null = await photoRepository.findOneBy({
        id: Number(id)
    })
    
    if (!photoToUpdate) return res.status(404).json({detail: `No photo found with id: ${id}`})

    photoToUpdate.name = name
    photoToUpdate.description = description
    photoToUpdate.filename = filename
    photoToUpdate.views = views
    photoToUpdate.isPublished = isPublished

    // await photoRepository.save(photoToUpdate)
    
    return res.status(200).json({data: photoToUpdate})
})

router.delete('/:id',async (req:Request, res: Response) => {
    const {id} = req.params

    // const photoRepository = AppDataSource.getRepository(Photo)

    const photoToRemove: Photo | null = await photoRepository.findOneBy({
        id: Number(id)
    })

    if (!photoToRemove) return res.status(404).json({detail: `No photo found with id: ${id}`})

    await photoRepository.remove(photoToRemove)

    return res.sendStatus(204)
})

export default router