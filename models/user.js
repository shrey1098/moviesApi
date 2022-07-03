import mongoose from "mongoose";

const userSchema= mongoose.Schema({
googleId: {type: String,},
name: { firstName:{type: String},
    familyName: {type: String}},
email: {
type: String, 
match: /[a-z0–9!#$%&’*+/=?^_`{|}~-]+(?:\.[a-z0–9!#$%&’*+/=?^_`{|}~-]+)*@(?:[a-z0–9](?:[a-z0–9-]*[a-z0–9])?\.)+[a-z0–9](?:[a-z0–9-]*[a-z0–9])?/,
},
apiKey:{type:String},
});

const userModel = mongoose.model('User', userSchema);

export {userModel as User}