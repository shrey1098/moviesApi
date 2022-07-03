import express from "express";
import passport from "passport";
import ('../controllers/auth.js')
import { newRegister } from "../controllers/auth.js";
import { decryptToken } from "../utils/decryptToken.js";
import path from 'path';
const router = express.Router()

const __dirname = path.resolve(path.dirname('')); 

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html')); 
})

router.post('/newRegister', (req, res) => {
  newRegister(req, res);
})

// google strategy route to register users
router.get('/google', passport.authenticate('google',
 {scope: ['openid','profile', 'email'], passReqToCallback:true})
 )

 router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/google' }),
  (req, res)=> {
    if(req.user['apikey']){
      res.status(200).json({'user':req.user['email'], 'apikey': req.user['apikey']})
    }
    else{
      // get api key of the existing user & decrypt it
      res.status(200).json({'user':req.user['email'],"apiKey": decryptToken(req.user['apiKey'])})
    }
  });

export{
    router as authRouter
} 