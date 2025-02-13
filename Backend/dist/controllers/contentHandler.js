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
exports.contentHandler = void 0;
const db_1 = require("../db");
const contentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            res.status(401).json({ message: "Unauthorized: No userId found" });
            return;
        }
        const { link, type, title, tags = [] } = req.body;
        // const tagIds = tags.map((tag: string) => new ObjectId(tag));
        yield db_1.Content.create({
            link,
            type,
            title,
            userId: req.userId,
            tags: []
        });
        res.json({
            message: 'Your content added!'
        });
    }
    catch (err) {
        res.json({
            message: 'Error while adding content',
            err
        });
    }
});
exports.contentHandler = contentHandler;
