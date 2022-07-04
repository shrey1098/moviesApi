import express from "express";
import passport from "passport";
import ('../controllers/auth.js')
import { newRegister, login } from "../controllers/auth.js";
import { decryptToken } from "../utils/decryptToken.js";
import path from 'path';
const router = express.Router()

const __dirname = path.resolve(path.dirname('')); 

// register page - render register.html
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html')); 
})
// loginpage - render login.html
router.get('/loginpage', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html')); 
})
// registers user with username, id and password
router.post('/newRegister', (req, res) => {
  newRegister(req, res);
})
//login user with id and password
router.post('/login', (req, res) => {
  login(req, res);
})
// google strategy route to register users
router.get('/google', passport.authenticate('google',
 {scope: ['openid','profile', 'email'], passReqToCallback:true})
 )
// google registration callback route
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