import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    channel:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Channel"
    }
}, { timestamps: true });


const User =mongoose.model("User",userSchema);

export default User;