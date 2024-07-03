"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConnection_1 = __importDefault(require("./mongoConnection"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = require("./passportConfig");
const routesManager_1 = require("./routes/routesManager");
let PORT = process.env.PORT;
const app = (0, express_1.default)();
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
passport_1.default.use(passportConfig_1.strategy);
//connect to mongo database
(0, mongoConnection_1.default)();
//routes
app.use("/post", routesManager_1.postRoutes);
app.use("/signUp", routesManager_1.signUpRoutes);
app.use("/logIn", routesManager_1.logInRoutes);
app.listen(PORT);
//.on("error", (error: any) => {
//   if (error.code == "EADDRINUSE") {
//     const oldPort = PORT;
//     const newPort = ++PORT;
//     console.log("Server port " + oldPort + " is taken changing to " + newPort);
//   } else {
//     console.log("Server Error: " + error);
//   }
// });
