"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueTocken = issueTocken;
const jsonwebtoken_1 = require("jsonwebtoken");
function issueTocken(user) {
    const _id = user._id;
    const expiringDate = "1d";
    const jwt_payload = {
        sub: _id,
        dateOfCreation: Date.now()
    };
    const token = (0, jsonwebtoken_1.sign)(jwt_payload, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: expiringDate });
    return {
        tokenWithBearer: "Bearer " + token,
        expiringDate
    };
}
