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
exports.signinHandler = void 0;
const db_1 = require("../db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt_1 = __importDefault(require("bcrypt"));
const signinHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const doesUserExists = yield db_1.User.findOne({
            username
        });
        if (!doesUserExists) {
            res.status(400).json({
                msg: 'User does not exist'
            });
            return;
        }
        const checkPassword = yield bcrypt_1.default.compare(password, doesUserExists.password);
        if (!checkPassword) {
            res.status(400).json({
                msg: "invalid password"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: doesUserExists._id
        }, JWT_SECRET);
        res.json({
            message: 'You have succesfully signed up!',
            token
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Internal server error"
        });
        console.error("Error while signup", err);
    }
});
exports.signinHandler = signinHandler;
