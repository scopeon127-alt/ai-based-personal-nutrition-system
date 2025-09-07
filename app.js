const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
const User = require("./models/User");
const path = require("path");

const app = express();

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/nutrition", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "nutritionSecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });
      if (user.password !== password)
        return done(null, false, { message: "Invalid password" });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id).then((user) => done(null, user))
);

// Routes
app.use("/", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));

// Server
app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
