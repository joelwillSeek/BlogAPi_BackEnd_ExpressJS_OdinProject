import express from "express";
import connectDB from "./mongoConnection";
import cors from "cors";
import passport from "passport";
import { strategy } from "./passportConfig";
import { logInRoutes, signUpRoutes, postRoutes } from "./routes/routesManager";

let PORT: number = parseInt(process.env.PORT || "3001");

const app = express();

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
passport.use(strategy);

//connect to mongo database
connectDB();

//routes
app.use("/post", postRoutes);
app.use("/signUp", signUpRoutes);
app.use("/logIn", logInRoutes);

console.log("3001");

app.listen(PORT).on("error", (error: any) => {
  if (error.code == "EADDRINUSE") {
    const oldPort = PORT;
    const newPort = ++PORT;
    console.log("Server port " + oldPort + " is taken changing to " + newPort);
  } else {
    console.log("Server Error: " + error);
  }
});
