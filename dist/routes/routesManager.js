"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = exports.signUpRoutes = exports.logInRoutes = void 0;
const LogInRoutes_1 = __importDefault(require("./LogInRoutes"));
exports.logInRoutes = LogInRoutes_1.default;
const signUpRouter_1 = __importDefault(require("./signUpRouter"));
exports.signUpRoutes = signUpRouter_1.default;
const postRouter_1 = __importDefault(require("./postRouter"));
exports.postRoutes = postRouter_1.default;
