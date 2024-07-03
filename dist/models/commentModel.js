"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const newComment = new mongoose_1.Schema({
    commenterName: String,
    comment: String,
    timeStamp: String,
});
exports.default = (0, mongoose_1.model)("comments", newComment);
