"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//commentUniqueID consists of [Author Name][Random Number]
const postSchema = new mongoose_1.Schema({
    title: String,
    userIDOfCreator: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" },
    discription: String,
    timecreated: String,
    allCommentsMade: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "comments" }],
    isPublic: Boolean,
});
exports.default = (0, mongoose_1.model)("posts", postSchema);
