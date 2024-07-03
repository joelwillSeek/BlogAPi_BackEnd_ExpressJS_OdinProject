"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logInController_1 = require("../controller/logInController");
const router = (0, express_1.Router)();
router.post("/", logInController_1.logIn_getUserIfExists);
exports.default = router;
