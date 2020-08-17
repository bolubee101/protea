const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const User = require("../models/users");
const database = require("../config/database");

router.post("/register", (req, res) => {
  // This is shorter and works is the input names correspond to your target names
  let newUser = new User(req.body);
  User.addUser(newUser, (err, user) => {
    if (err) {
      let message = "";
      if (err.errors.username) message = "Username is already taken";
      if (err.errors.email) message += "Email already exists";
      res.json({
        success: false,
        message,
      });
    } else {
      res.json({
        success: true,
        message: "User registration is successful",
      });
    }
  });
});
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        message: "User not found",
      });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(
          {
            type: "user",
            data: {
              _id: user._id,
              username: user.username,
              firstname: user.firstname,
              email: user.email,
            },
          },
          config.secret,
          {
            expiresIn: 604800,
          }
        );
        res.json({
          success: true,
          token: "JWT " + token,
        });
      } else {
        res.json({
          success: false,
          message: "wrong password",
        });
      }
    });
  });
});

// get authenticated user profile

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json("hello world");
  }
);

module.exports = router;
