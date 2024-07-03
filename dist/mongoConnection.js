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
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const devUrl = "mongodb://127.0.0.1:27017/Blog?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6";
    yield mongoose_1.default.connect(devUrl);
});
const db = mongoose_1.default.connection;
db.on("connected", () => console.log("Mongodb Connected"));
db.on("disconnected", () => console.log("Mongodb Disconnected"));
db.on("error", (err) => console.log("Error has occured: ", err));
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    console.log("connection has been terminated");
    process.exit(0);
}));
exports.default = connectDB;
