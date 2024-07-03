"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUpController_1 = require("../controller/signUpController");
const router = (0, express_1.Router)();
router.post("/", signUpController_1.signUp_createAccount);
exports.default = router;
