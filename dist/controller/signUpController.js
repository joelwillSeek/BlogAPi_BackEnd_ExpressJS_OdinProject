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
exports.signUp_createAccount = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const jsonwebtokenFuncations_1 = require("../jsonwebtokenFuncations");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp_createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        const doesUserNameExist = yield usersModel_1.default.exists({
            userNameStore: userName,
        });
        if (doesUserNameExist != null)
            return res.status(409).json({ msg: "User Name Already Exists" });
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield new usersModel_1.default({
            userNameStore: userName,
            emailStore: email,
            passwordStore: hashPassword,
        });
        yield newUser.save();
        const tokenCreated = (0, jsonwebtokenFuncations_1.issueTocken)(newUser);
        return res.status(200).json({
            token: tokenCreated.tokenWithBearer,
            expireingOn: tokenCreated.expiringDate,
            userName: userName,
        });
    }
    catch (err) {
        console.log("error when making user: ", err);
    }
});
exports.signUp_createAccount = signUp_createAccount;
