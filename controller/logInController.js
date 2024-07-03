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
exports.logIn_getUserIfExists = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
const jsonwebtokenFuncations_1 = require("../jsonwebtokenFuncations");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logIn_getUserIfExists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        const userFound = yield usersModel_1.default.findOne({ userNameStore: userName });
        if (userFound == null)
            return res.status(404).json({ msg: "No Such User" });
        const compareResult = yield bcrypt_1.default.compare(password, userFound === null || userFound === void 0 ? void 0 : userFound.passwordStore.toString());
        if (!compareResult)
            return res.status(404).json({ msg: "Password is not wrong" });
        const tokenCreated = (0, jsonwebtokenFuncations_1.issueTocken)(userFound);
        return res.status(200).json({
            token: tokenCreated.tokenWithBearer,
            expireingOn: tokenCreated.expiringDate,
            userName: userName,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.logIn_getUserIfExists = logIn_getUserIfExists;
