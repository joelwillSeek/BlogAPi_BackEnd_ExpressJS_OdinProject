import { Router } from "express";
import passport from "passport";
import {
  postController_createAPost,
  postController_getAllPosts,
  postController_getAllPostsOfUser,
  postController_commentOnPost,
  postController_updateAPost,
  postController_deletePostComment,
} from "../controller/postController";

const router = Router();

const authenticate = passport.authenticate("jwt", { session: false });

//removeing authentication for dev
router.post("/createAPost", authenticate, postController_createAPost);
router.get("/allPosts", authenticate, postController_getAllPosts);
router.get("/getUserPost", authenticate, postController_getAllPostsOfUser);
router.post("/commentOnPost", authenticate, postController_commentOnPost);
router.put("/updateAPost", authenticate, postController_updateAPost);
router.delete(
  "/deletePostComment",
  authenticate,
  postController_deletePostComment
);

// router.post("/createComment",)

export default router;
