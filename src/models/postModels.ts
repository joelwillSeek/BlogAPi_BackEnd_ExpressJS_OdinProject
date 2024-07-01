import { Document, Schema, Types, model } from "mongoose";

export interface PostDataType extends Document {
  title: String;
  userIDOfCreator: { type: Schema.Types.ObjectId; ref: "users" };
  discription: String;
  timecreated: String;
  allCommentsMade: [Types.ObjectId];
  isPublic: Boolean;
}

//commentUniqueID consists of [Author Name][Random Number]
const postSchema = new Schema<PostDataType>({
  title: String,
  userIDOfCreator: { type: Schema.Types.ObjectId, ref: "users" },
  discription: String,
  timecreated: String,
  allCommentsMade: [{ type: Schema.Types.ObjectId, ref: "comments" }],
  isPublic: Boolean,
});

export default model<PostDataType>("posts", postSchema);
