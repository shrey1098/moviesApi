import passport from "passport";
import {Strategy} from 'passport-google-oauth20';
import { User } from "../models/user.js";
import { generateToken, hashToken } from "../utils/generateToken.js";


// google strategy to register users

const GoogleStrategy = Strategy;

const GOOGLE_CLIENT_ID = "446858865452-1qfls9dstlg3bupcn7hpruu6jsiip66v.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5040/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      //console.log(cb)
      // api key is sent to the user
      let apiKey = generateToken()
      // encrypted api key is saved to the DB
      let hashApiKey = hashToken(apiKey)
      User.findOne({ googleId: profile.id }, async function (err, user) {
        if (err) {
          return cb(err)
        }
        // Create new user
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
