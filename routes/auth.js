const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

// Home Page
router.get("/", (req, res) => {
  res.render("home");
});

// Signup Page
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Login Page
router.get("/login", (req, res) => {
  res.render("login");
});

// Signup Post
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    res.send("Error: " + err);
  }
});

// Login Post
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

module.exports = router;
