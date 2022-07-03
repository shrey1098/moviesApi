import express from "express";
import passport from "passport";
import ('../controllers/auth.js')
import { decryptToken } from "../utils/decryptToken.js";
const router = express.Router()

// google strategy route to register users
router.get('/google', passport.authenticate('google',
 {scope: ['openid','profile', 'email'], passReqToCallback:true})
 )

 router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/google' }),
  (req, res)=> {
    if(req.user['apikey']){
      res.status(200).json({'apikey': req.user['apikey']})
    }
    else{
      // get api key of the existing user & decrypt it
      res.status(200).json({"apiKey": decryptToken(req.user['apiKey'])})
    }
  });

export{
    router as authRouter
} 