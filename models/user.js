import mongoose from "mongoose";

const userSchema= mongoose.Schema({
googleId: {type: String,
required: true},
name: { firstName:{type: String},
    familyName: {type: String}, required:false},
email: {
type: String, required:true,
},
apiKey:{type:String},
password:{type:String, required:false},
});

const userModel = mongoose.model('User', userSchema);

export {userModel as User}