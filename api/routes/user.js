const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  loginRules,
  registerRules,
  validation,
} = require("../middleware/validator");
const { isAuth } = require("../middleware/auth");
const { userCurrent } = require("../client/src/Js/Slice/userSlice");
const users = require("../models/users");
require("dotenv").config({ path: "../.env" });
const { sendWelcomeEmail } = require("../Mailer/RegisterMailer");
const { sendPasswordResetEmail } = require('../Mailer/ForgotPasswordMailer');
const crypto = require("crypto");


// register route
router.post("/register", registerRules(), validation, async (req, res) => {
  const {
    name,
    lastname,
    email,
    phoneNumber,
    password,
    dateofBirth,
    isDoctor,
    specialty,
    address,
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
      dateofBirth,
      isDoctor,
      specialty,
      address,
    });
    await newUser.save();
    // Create Token
    const payload = {
      id: newUser._id,
      name: newUser.name,
    };
    // Send welcome email
    if (newUser) {
      sendWelcomeEmail(newUser);
    }
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "8640000",
    });

    res
      .status(201)
      .json({ user: newUser, msg: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
});

// Login route
router.post("/login", loginRules(), validation, async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ msg: "User does not exist" });
    }
    // Compare Passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Invalid credentials" });
    }
    // Create Token
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "8640000",
    });
    res.status(200).send({
      user: user,
      msg: "Connexion réussie, code envoyé",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(error);
  }
});
// forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne( req.body.email );
    if (!user) {
      return res.status(404).json({ msg: 'User with this email does not exist.' });
    }

    const plainToken = crypto.randomBytes(20).toString('hex');

   user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(plainToken)
      .digest('hex');
      
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; 

    await user.save();
    
    const resetUrl = `http://localhost:3000/reset-password/${plainToken}`;

    sendPasswordResetEmail(user, resetUrl);

    res.status(200).json({ msg: 'Password reset link has been sent to your email.' });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ msg: 'Server Error' });
  }
});
// reset password
router.put('/reset-password/:token', async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, 
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token. Please try again.' });
    }
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    
    res.status(200).json({ msg: 'Password has been reset successfully.' });

  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ msg: 'Server Error' });
  }
});


// Current Route
router.get("/current", isAuth, async (req, res) => {
  res.status(200).send({ user: req.user });
});
// Find Route
router.get("/", async (req, res) => {
  try {
    let result = await users.find();
    res.send({ users: result, msg: "All users" });
  } catch (error) {
    console.log(error);
  }
});

// Get all Doctor
router.get("/doctor", async (req, res) => {
  try {
    let result = await users.find({ isDoctor: true });
    res.send({ users: result, msg: "All Doctor" });
  } catch (error) {
    console.log(error);
  }
});

// get patient by id
router.get("/:id", async (req, res) => {
  try {
    let result = await users.findById(req.params.id);
    res.send({ user: result, msg: "user by ID" });
  } catch (error) {
    console.log(error);
  }
});

// update user
router.put("/:id", async (req, res) => {
  try {
    const { password, ...otherUpdate } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      otherUpdate.password = await bcrypt.hash(password, salt);
    }
    let result = await users.findByIdAndUpdate(
      req.params.id,
      { $set: otherUpdate },
      { new: true }
    );
    if (!result) {
      return res.status(404).send("user not Found");
    }
    res.send({ result, msg: "Updated" });
  } catch (error) {
    res.send(error);
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    let result = await users.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send("user not Found");
    }
    res.send("user has been deleted");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
