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
exports.viewContentHandler = void 0;
const db_1 = require("../db");
const viewContentHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized: No userId found" });
            return;
        }
        const content = yield db_1.Content.find({ userId }).populate('userId', 'username');
        res.status(200).json(content);
    }
    catch (err) {
        console.error("Error fetching content:", err);
        res.status(500).json({
            message: "Error occurred while fetching content.",
            error: err instanceof Error ? err.message : "Unknown error",
        });
    }
});
exports.viewContentHandler = viewContentHandler;
