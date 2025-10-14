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
exports.shareLinkHandler = void 0;
const db_1 = require("../db");
const shareLinkHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shareLink = req.params.shareLink;
        if (!shareLink) {
            res.status(400).json({ message: "Share link is required" });
            return;
        }
        const link = yield db_1.Link.findOne({ hash: shareLink });
        if (!link) {
            res.status(404).json({ message: "Invalid share link" });
            return;
        }
        const user = yield db_1.User.findOne({ _id: link.userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const content = yield db_1.Content.find({ userId: link.userId }).limit(50);
        if (!content || content.length === 0) {
            res.status(404).json({ message: "No content found" });
            return;
        }
        res.json({
            username: user.username,
            content
        });
    }
    catch (err) {
        console.error('Error in shareLinkHandler:', err instanceof Error ? err.message : 'Unknown error');
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.shareLinkHandler = shareLinkHandler;
