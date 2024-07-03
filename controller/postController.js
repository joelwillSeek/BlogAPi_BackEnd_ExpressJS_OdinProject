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
exports.postController_createAPost = postController_createAPost;
exports.postController_deletePostComment = postController_deletePostComment;
exports.postController_updateAPost = postController_updateAPost;
exports.postController_getAllPosts = postController_getAllPosts;
exports.postController_getAllPostsOfUser = postController_getAllPostsOfUser;
exports.postController_commentOnPost = postController_commentOnPost;
const postModels_1 = __importDefault(require("../models/postModels"));
const date_and_time_1 = __importDefault(require("date-and-time"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
function postController_createAPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = req.body.title;
        const discription = req.body.discription;
        const isPublic = req.body.isPublic;
        try {
            if (!req.user)
                return console.error("no user logged in", req.user);
            const newPost = yield new postModels_1.default({
                title: title,
                discription: discription,
                timecreated: date_and_time_1.default.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
                isPublic: isPublic,
                userIDOfCreator: req.user.id,
            });
            yield newPost.save();
            res.sendStatus(200);
        }
        catch (err) {
            console.log("Error:", err);
        }
    });
}
function postController_deletePostComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const commentID = req.body._id;
        const postID = req.body.postID;
        try {
            const responseOfComment = yield commentModel_1.default.deleteOne({ _id: commentID });
            if (responseOfComment.deletedCount >= 0) {
                console.log("Comment Deleted");
                const responseOfPost = yield postModels_1.default.updateOne({ _id: postID }, { $pull: { allCommentsMade: commentID } });
                if (responseOfPost.matchedCount <= 0)
                    return res.sendStatus(404);
                return res.sendStatus(200);
            }
            else {
                console.log("Cant delete comment");
                return res.sendStatus(404);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
function postController_updateAPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const _id = req.body._id;
        const title = req.body.title;
        const discription = req.body.discription;
        const isPublic = req.body.isPublic;
        function tryToUpdatePost(_id, title, discription, isPublic) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield postModels_1.default
                    .updateOne({ _id: _id }, {
                    $set: {
                        title: title,
                        discription: discription,
                        isPublic: isPublic,
                        timecreated: date_and_time_1.default.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
                    },
                })
                    .exec();
                return response;
            });
        }
        try {
            const response = yield tryToUpdatePost(_id, title, discription, isPublic);
            if (response.matchedCount <= 0) {
                console.log("Update not completed");
                return res.sendStatus(404);
            }
            return res.sendStatus(200);
        }
        catch (err) {
            console.log("Error: ", err);
        }
    });
}
function postController_getAllPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allThePostOfTheUser = yield postModels_1.default
                .find({ isPublic: true })
                .populate("allCommentsMade")
                .exec();
            return res.status(200).json({ posts: allThePostOfTheUser });
        }
        catch (e) {
            console.log(e);
        }
    });
}
function postController_getAllPostsOfUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user)
                return res.sendStatus(404);
            const allThePostOfTheUser = yield postModels_1.default
                .find({
                userIDOfCreator: req.user.id,
            })
                .populate("allCommentsMade");
            return res.status(200).json({ posts: allThePostOfTheUser });
        }
        catch (e) {
            console.log(e);
        }
    });
}
function postController_commentOnPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const postID = req.body.postID;
        const comment = req.body.comment;
        const commenterName = req.body.commenterName;
        try {
            const postToBeCommentedOn = yield postModels_1.default.findOne({ _id: postID });
            const newComment = yield new commentModel_1.default({
                timeStamp: date_and_time_1.default.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
                commenterName: commenterName,
                comment: comment,
            });
            yield newComment.save();
            let newCommentID = newComment._id;
            yield (postToBeCommentedOn === null || postToBeCommentedOn === void 0 ? void 0 : postToBeCommentedOn.allCommentsMade.push(newCommentID));
            yield (postToBeCommentedOn === null || postToBeCommentedOn === void 0 ? void 0 : postToBeCommentedOn.save());
            return res.sendStatus(200);
        }
        catch (err) {
            console.error("Comment On Post Error:", err);
        }
    });
}
