"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const postController_1 = require("../controller/postController");
const router = (0, express_1.Router)();
const authenticate = passport_1.default.authenticate("jwt", { session: false });
//removeing authentication for dev
router.post("/createAPost", authenticate, postController_1.postController_createAPost);
router.get("/allPosts", authenticate, postController_1.postController_getAllPosts);
router.get("/getUserPost", authenticate, postController_1.postController_getAllPostsOfUser);
router.post("/commentOnPost", authenticate, postController_1.postController_commentOnPost);
router.put("/updateAPost", authenticate, postController_1.postController_updateAPost);
router.delete("/deletePostComment", authenticate, postController_1.postController_deletePostComment);
// router.post("/createComment",)
exports.default = router;
