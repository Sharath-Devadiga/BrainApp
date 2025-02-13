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
exports.shareHandler = void 0;
const db_1 = require("../db");
const crypto_1 = __importDefault(require("crypto"));
const shareHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { share } = req.body;
        if (share) {
            const existingLink = yield db_1.Link.findOne({ userId: req.userId });
            if (existingLink) {
                res.json({ hash: existingLink.hash });
                return;
            }
            const hash = crypto_1.default.randomBytes(10).toString("hex");
            yield db_1.Link.create({ userId: req.userId, hash });
            res.json({ hash });
        }
        else {
            yield db_1.Link.deleteOne({ userId: req.userId });
            res.json({ message: "Removed link" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.shareHandler = shareHandler;
