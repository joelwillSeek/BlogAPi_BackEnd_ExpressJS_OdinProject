import { Request, Response } from "express";
import postModels from "../models/postModels";
import date from "date-and-time";
import commentModel from "../models/commentModel";
import mongoose from "mongoose";

export async function postController_createAPost(req: any, res: Response) {
  const title = req.body.title;
  const discription = req.body.discription;
  const isPublic = req.body.isPublic;

  try {
    if (!req.user) return console.error("no user logged in", req.user);
    const newPost = await new postModels({
      title: title,
      discription: discription,
      timecreated: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      isPublic: isPublic,
      userIDOfCreator: req.user.id,
    });

    await newPost.save();
    res.sendStatus(200);
  } catch (err) {
    console.log("Error:", err);
  }
}

export async function postController_deletePostComment(
  req: Request,
  res: Response
) {
  const commentID = req.body._id;
  const postID = req.body.postID;

  try {
    const responseOfComment = await commentModel.deleteOne({ _id: commentID });

    if (responseOfComment.deletedCount >= 0) {
      console.log("Comment Deleted");
      const responseOfPost = await postModels.updateOne(
        { _id: postID },
        { $pull: { allCommentsMade: `ObjectId('${commentID}')` } }
      );
      if (responseOfPost.matchedCount <= 0) return res.sendStatus(404);
      return res.sendStatus(200);
    } else {
      console.log("Cant delete comment");
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function postController_updateAPost(req: Request, res: Response) {
  const _id = req.body._id;
  const title = req.body.title;
  const discription = req.body.discription;
  const isPublic = req.body.isPublic;

  async function tryToUpdatePost(
    _id: string,
    title: string,
    discription: string,
    isPublic: boolean
  ) {
    const response = await postModels
      .updateOne(
        { _id: _id },
        {
          $set: {
            title: title,
            discription: discription,
            isPublic: isPublic,
            timecreated: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
          },
        }
      )
      .exec();

    return response;
  }

  try {
    const response = await tryToUpdatePost(_id, title, discription, isPublic);

    if (response.matchedCount <= 0) {
      console.log("Update not completed");
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  } catch (err) {
    console.log("Error: ", err);
  }
}

export async function postController_getAllPosts(req: Request, res: Response) {
  try {
    const allThePostOfTheUser = await postModels
      .find({ isPublic: true })
      .populate("allCommentsMade")
      .exec();

    return res.status(200).json({ posts: allThePostOfTheUser });
  } catch (e) {
    console.log(e);
  }
}

export async function postController_getAllPostsOfUser(
  req: any,
  res: Response
) {
  try {
    if (!req.user) return res.sendStatus(404);
    const allThePostOfTheUser = await postModels
      .find({
        userIDOfCreator: req.user.id,
      })
      .populate("allCommentsMade");
    return res.status(200).json({ posts: allThePostOfTheUser });
  } catch (e) {
    console.log(e);
  }
}

export async function postController_commentOnPost(
  req: Request,
  res: Response
) {
  const postID = req.body.postID;
  const comment = req.body.comment;
  const commenterName = req.body.commenterName;

  try {
    const postToBeCommentedOn = await postModels.findOne({ _id: postID });
    const newComment = await new commentModel({
      timeStamp: date.format(new Date(), "YYYY/MM/DD HH:mm:ss"),
      commenterName: commenterName,
      comment: comment,
    });

    await newComment.save();

    let newCommentID: any = newComment._id;

    await postToBeCommentedOn?.allCommentsMade.push(newCommentID);

    await postToBeCommentedOn?.save();

    return res.sendStatus(200);
  } catch (err) {
    console.error("Comment On Post Error:", err);
  }
}
