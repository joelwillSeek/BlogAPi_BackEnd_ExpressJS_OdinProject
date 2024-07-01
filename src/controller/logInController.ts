import { Request, Response, NextFunction } from "express";
import usersModel from "../models/usersModel";
import { issueTocken } from "../jsonwebtokenFuncations";
import bcrypt from "bcrypt";

export const logIn_getUserIfExists = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    const userFound = await usersModel.findOne({ userNameStore: userName });

    if (userFound == null) return res.status(404).json({ msg: "No Such User" });

    const compareResult = await bcrypt.compare(
      password,
      userFound?.passwordStore.toString()
    );

    if (!compareResult)
      return res.status(404).json({ msg: "Password is not wrong" });

    const tokenCreated = issueTocken(userFound);

    return res.status(200).json({
      token: tokenCreated.tokenWithBearer,
      expireingOn: tokenCreated.expiringDate,
      userName: userName,
    });
  } catch (err) {
    console.log(err);
  }
};
