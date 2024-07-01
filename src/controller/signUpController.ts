import { Request, Response, NextFunction } from "express";
import usersModel from "../models/usersModel";
import { issueTocken } from "../jsonwebtokenFuncations";
import bcrypt from "bcrypt";

export const signUp_createAccount = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    const doesUserNameExist = await usersModel.exists({
      userNameStore: userName,
    });

    if (doesUserNameExist != null)
      return res.status(409).json({ msg: "User Name Already Exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new usersModel({
      userNameStore: userName,
      emailStore: email,
      passwordStore: hashPassword,
    });

    await newUser.save();

    const tokenCreated = issueTocken(newUser);

    return res.status(200).json({
      token: tokenCreated.tokenWithBearer,
      expireingOn: tokenCreated.expiringDate,
      userName: userName,
    });
  } catch (err) {
    console.log("error when making user: ", err);
  }
};
