import { User } from "../models/user.js";
import { hashToken } from "../utils/generateToken.js";

const verifyToken = (req, res, next) => {
    const apiToken = req.query.apiToken;
    if (apiToken){
        // encrypt user token and compare with the one in the DB
        const hToken = hashToken(apiToken)
        User.findOne({apiKey: hToken}, function (err, user) {
            if (err) {
                res.status(404).send(err)
              }
            if (!user){
                res.status(404).json({message:'user not found'})
            }else{
                res.locals.googleId = user.googleId
                next()
            }
        })
    }else{
        res.status(404).json({message:'apiToken not provided'})
    }
}

export {verifyToken}