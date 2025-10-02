const express =require('express')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { loginRules , registerRules , validation } = require('../middleware/validator')
const { isAuth } = require('../middleware/auth')
const { userCurrent } = require('../client/src/Js/userSlice/userSlice')
const users = require('../models/users')
require('dotenv').config({path : '../.env'})

// register route
router.post("/register",registerRules() , validation ,async (req, res) => {
  const {name,lastname,email,phoneNumber,password,dateofBirth,isDoctor,specialty} = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name,lastname,email,phoneNumber,password: hashedPassword,dateofBirth,isDoctor,specialty});
    await newUser.save();
    // Create Token 
        const payload = {
            id : newUser._id ,
            name : newUser.name
        }
        const token =await jwt.sign(payload , process.env.SECRET_KEY , {expiresIn : '86400'})
        
    res.status(201).json({ user: newUser, msg: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
});


// Login route
router.post('/login' , loginRules() , validation ,async (req , res ) =>{
    const {email , password} = req.body ;
    try {
        // Check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).send({msg : "User does not exist"})
        }
        // Compare Passwords
        const isMatch = await bcrypt.compare(password , user.password)
        if(!isMatch){
            return res.status(400).send({msg : "Invalid credentials"})
        }
        // Create Token 
        const payload = {
            id : user._id             
        }
        const token =await jwt.sign(payload , process.env.SECRET_KEY , {expiresIn : '86400'})
            res.status(200).send({user: userCurrent,msg: "Connexion réussie, code envoyé",token: `Bearer ${token}`,
        });
        
    } catch (error) {
        console.log(error)
    }
})


router.get('/current' ,isAuth , async (req , res) =>{
    res.status(200).send( {user : req.user})
})

router.get("/", async (req, res) => {
  try {
    let result = await users.find(); 
    res.send({ users: result, msg: "All users" });
  }
  catch (error) {
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
router.put('/:id' , async (req , res)=> {
    try {
        const {password , ...otherUpdate} = req.body;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            otherUpdate.password = await bcrypt.hash(password , salt);
        }
        let result = await users.findByIdAndUpdate(req.params.id ,{$set : otherUpdate},{new : true});
        if(!result){
          return res.status(404).send("user not Found");
        }
        res.send({result , msg:"Updated"})
    } catch (error) {
        res.send(error)
    }
})

// delete user
router.delete('/:id' , async (req , res) => {
  try {
    let result = await users.findByIdAndDelete(req.params.id)
    if(!result){
      return res.status(404).send("user not Found");
    }
    res.send('user has been deleted')
  } catch (error) {
    res.send(error)
  }
})
 

module.exports = router