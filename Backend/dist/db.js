"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Tags = exports.Content = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId;
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const tagsSchema = new Schema({
    title: { type: String, required: true, unique: true }
});
const contentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    tags: [{ type: ObjectId, ref: 'tags' }],
    userId: { type: ObjectId, ref: 'users', required: true },
});
const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'users', required: true }
});
exports.User = mongoose_1.default.model('users', userSchema);
exports.Content = mongoose_1.default.model('contents', contentSchema);
exports.Tags = mongoose_1.default.model('tags', tagsSchema);
exports.Link = mongoose_1.default.model('links', linkSchema);
