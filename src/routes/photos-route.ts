import { Request, Response, Router } from "express"

import { createPhoto, getOnePhotoById, getAllPhotos, updateAPhoto, deletePhoto } from '../controller/photo-controller'

const router = Router()

router.post('/', async(req: Request, res: Response) => {
    const { name, description, filename, views, isPublished } = req.body
    
    const photo = await createPhoto(req.body)

    return res.status(201).json({data: photo})
})

router.get('/:id', async (req:Request, res:Response) => {
    const {id} = req.params

    const photo = await getOnePhotoById(Number(id))

    if (!photo) return res.status(404).json({detail: `No photo found with id: ${id}`})

    return res.json(photo)
    
})


router.get('/',async (req:Request, res: Response) => {
    const { published } = req.query

    const publishedBool: boolean | undefined = published === undefined ? undefined : published === 'true' ? true : false
    
    // const photoRepository = AppDataSource.getRepository(Photo)
    const allPhotos = await getAllPhotos(publishedBool)

    return res.json(allPhotos)
})

router.put('/:id',async (req:Request, res: Response) => {
    const {id} = req.params
    
    const photoToUpdate = await updateAPhoto(Number(id), req.body)

    if (photoToUpdate === undefined) return res.status(404).json({detail: `No photo found with that id: ${id}`})
    if (photoToUpdate === null) return res.status(400).json({detail: `Error while saving the photo`})
    
    return res.status(200).json({data: photoToUpdate})
})

router.delete('/:id',async (req:Request, res: Response) => {
    const {id} = req.params

    if (await deletePhoto(Number(id))) return res.sendStatus(204)

    return res.status(404).json({detail: `No photo found with id: ${id}`})
})

export default router