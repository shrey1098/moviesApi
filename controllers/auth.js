import passport from "passport";
import {Strategy} from 'passport-google-oauth20';
import { User } from "../models/user.js";
import { decryptToken } from "../utils/decryptToken.js";
import { generateToken, hashToken } from "../utils/generateToken.js";
import { body, validationResult } from "express-validator";


// google strategy to register users
const GoogleStrategy = Strategy;
// client id and client secret are stored in .env file
const GOOGLE_CLIENT_ID = "446858865452-1qfls9dstlg3bupcn7hpruu6jsiip66v.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5040/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      //console.log(cb)
      // api key is sent to the user as response
      let apiKey = generateToken()
      // encrypted api key is saved to the DB
      let hashApiKey = hashToken(apiKey)
      // find user by googleId
      User.findOne({ googleId: profile.id }, async function (err, user) {
        if (err) {
          return cb(err)
        }
        // if user doesnt exist in db Create new user
        if(!user) {
        user = new User({
            googleId: profile.id,
            name:{
              firstName: profile.name.givenName,
              familyName: profile.name.familyName
            },
            email: profile._json.email,
            apiKey: hashApiKey,
          })
          try{
            await user.save();
            return cb(err, {'apikey':apiKey, 'user':user})
          }catch(err){
            return cb(err)
          }
        }
        // existing user
        if(user){
          return cb(err, user)
        }
      });
    }
));

passport.serializeUser(function(user, cb){
    cb(null, user);
})
passport.deserializeUser(function (user, cb){
    cb(null, user);
})

// register new user with email, password and username
const newRegister = (req, res) => {
  let apiKey = generateToken();
  let hashApiKey = hashToken(apiKey);
  // encrypt password
  let hashpassword = hashToken(req.body.password);
  // check if user.body is valid
  if(!req.body.username||!req.body.password||!req.body.email){
    return res.status(400).json({'error':'missing required fields'})
  }
  // check if user already exists
  User.findOne({email: req.body.email}, async function(err, user){
    if(err){
      return res.status(500).json({error: err})
    }
    if(user){
      return res.status(200).json({message: "User already exists", apikey: decryptToken(user.apiKey)})
    }
    // create new user
    let newUser = new User({
      googleId: req.body.email,
      email: req.body.email,
      name: {
        firstName: req.body.username,
      },
      apiKey: hashApiKey,
      password: hashpassword,
    })
    try{
        newUser.save();
      return res.status(200).json({'apikey':apiKey, 'user':newUser.email})
    }catch(err){
      return res.status(500).json({error: err})
    }
  }
  )
}

const login = (req, res) => {
  if(!req.body.email||!req.body.password){
    return res.status(400).json({'error':'missing required fields'})
  }
  User.findOne({email: req.body.email}, async function(err, user){
    if(err){
      return res.status(500).json({error: err})
    }
    if(!user){
      return res.status(200).json({message: "User not found"})
    }
    if(user.password!==hashToken(req.body.password)){
      return res.status(200).json({message: "Wrong password"})
    }
    return res.status(200).json({'apikey':decryptToken(user.apiKey), 'user':user})
  }
  )
}


export {newRegister, login};