"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const photo_entity_1 = require("../models/photo-entity");
const db_1 = require("../db");
const router = (0, express_1.Router)();
const photoRepository = db_1.AppDataSource.getRepository(photo_entity_1.Photo);
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, filename, views, isPublished } = req.body;
    const photo = new photo_entity_1.Photo();
    photo.name = name;
    photo.description = description;
    photo.filename = filename;
    photo.views = views;
    photo.isPublished = isPublished;
    yield db_1.AppDataSource.manager.save(photo);
    return res.status(201).json({ data: photo });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const photoRepository = AppDataSource.getRepository(Photo)
    const photo = yield photoRepository.findOneBy({
        id: Number(id)
    });
    if (!photo)
        return res.status(404).json({ detail: `No photo found with id: ${id}` });
    return res.json(photo);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { published } = req.query;
    const publishedBool = published === undefined ? undefined : published === 'true' ? true : false;
    // const photoRepository = AppDataSource.getRepository(Photo)
    const allPhotos = published === undefined ? yield (yield photoRepository.find()) : yield photoRepository.findBy({ isPublished: publishedBool });
    return res.json(allPhotos);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, filename, views, isPublished } = req.body;
    // const photoRepository = AppDataSource.getRepository(Photo)
    const photoToUpdate = yield photoRepository.findOneBy({
        id: Number(id)
    });
    if (!photoToUpdate)
        return res.status(404).json({ detail: `No photo found with id: ${id}` });
    photoToUpdate.name = name;
    photoToUpdate.description = description;
    photoToUpdate.filename = filename;
    photoToUpdate.views = views;
    photoToUpdate.isPublished = isPublished;
    // await photoRepository.save(photoToUpdate)
    return res.status(200).json({ data: photoToUpdate });
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // const photoRepository = AppDataSource.getRepository(Photo)
    const photoToRemove = yield photoRepository.findOneBy({
        id: Number(id)
    });
    if (!photoToRemove)
        return res.status(404).json({ detail: `No photo found with id: ${id}` });
    yield photoRepository.remove(photoToRemove);
    return res.status(204);
}));
exports.default = router;
