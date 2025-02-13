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
exports.signupHandler = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signupHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.json({
                message: 'Username and Password are required'
            });
            return;
        }
        const existingUser = yield db_1.User.findOne({ username });
        if (existingUser) {
            res.json({
                message: 'Username already exits'
            });
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 5);
        const newUser = yield db_1.User.create({
            username,
            password: hashPassword
        });
        res.status(200).json({
            msg: "Signup successfully!",
        });
    }
    catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});
exports.signupHandler = signupHandler;
