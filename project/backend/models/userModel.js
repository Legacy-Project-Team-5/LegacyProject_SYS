const mongoose = require("mongoose");




const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
        userType: {type:String,enum:["buyer","seller"]}
    },
    {
        timestamps: true,
    }
)


const User = mongoose.model("User", userSchema);



module.exports = User;