// Packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const SECRET_KEY = "SECRET_KEY";

// Middleware router
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const brandRouter = require("./routes/brandRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const { User } = require("./models/user");
const { sanetizeUser, isAuth, cookieExtractor } = require("./services/common");
const server = express();

// JWT Authentication
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY; // Should not be here, will create env

// Middleware
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.static("build"));
server.use(cookieParser());
server.use(express.json()); //? To parse req.body
server.use(express.urlencoded({ extended: false }));

//Session & Authentication
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    // store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);

//? Here I was getting error that express session middleware is not called also serialize and deserialize not being called because we have to declare passport.authenticate before we start routing or use routing i.e before authRouter.router
server.use(passport.authenticate("session"));

// Router middleware
server.use("/products", isAuth(), productRouter.router); // We can use JWT here.
server.use("/categories", isAuth(), categoryRouter.router);
server.use("/brands", isAuth(), brandRouter.router);
server.use("/users", isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), orderRouter.router);

//passport local strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        return done(null, false, { message: "Invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid credentials" });
          }
          const token = jwt.sign(sanetizeUser(user), SECRET_KEY);
          done(null, { id: user.id, role: user.role });
        }
      );
    } catch (error) {
      return done(error);
    }
  })
);

// JWT strategy

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanetizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

//? this creates session variable req.user being called from callbacks

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      role: user.role,
    });
  });
});

//? This changes session variable req.user when called from authorize request

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Main to start the server as well as connect to mongodb

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");
  console.log("Database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "Success" });
});

server.listen(8085, () => {
  console.log("Server started @ 8085");
});

main().catch((err) => console.log(err));
