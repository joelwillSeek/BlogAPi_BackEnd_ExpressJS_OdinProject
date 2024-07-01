import { ExtractJwt, Strategy } from "passport-jwt";
import usersModel from "./models/usersModel";
import passport from "passport";

export const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "your_jwt_secret",
  },
  async (jwt_payload, done) => {
    try {
      const userFound = await usersModel.findOne({ _id: jwt_payload.sub });
      if (userFound) {
        return done(null, userFound);
      }
      return done(null, false);
    } catch (err) {
      done(err, false);
    }
  }
);

passport.serializeUser(function (user: any, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  usersModel.findById(id, function (err: any, user: any) {
    done(err, user);
  });
});
