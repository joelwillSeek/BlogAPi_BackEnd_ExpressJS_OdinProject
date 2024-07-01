import { Document, Schema, model } from "mongoose";

export interface CommentDataType extends Document {
  commenterName: String;
  comment: String;
  timeStamp: String;
}

const newComment = new Schema<CommentDataType>({
  commenterName: String,
  comment: String,
  timeStamp: String,
});

export default model<CommentDataType>("comments", newComment);
