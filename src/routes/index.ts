import { Router } from 'express'
import PhotosRoute from './photos-route'

const router = Router()

router.use('/photos', PhotosRoute)

export default router