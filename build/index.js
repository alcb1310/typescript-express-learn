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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const photo_entity_1 = require("./models/photo-entity");
const db_1 = require("./db");
const environment_1 = require("./environment");
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('Express + Typescript Server is running');
});
const saveData = () => __awaiter(void 0, void 0, void 0, function* () {
    const photo = new photo_entity_1.Photo();
    photo.name = "Me and Bears";
    photo.description = "I am near polar bears";
    photo.filename = "photo-with-bears.jpg";
    photo.views = 1;
    photo.isPublished = true;
    yield db_1.AppDataSource.manager.save(photo);
});
app.listen(environment_1.port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${environment_1.port}`);
});
