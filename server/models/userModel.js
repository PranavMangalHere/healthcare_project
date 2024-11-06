const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            require: [true, "enter your name"],
        },
        lastName:{
            type:String,
            require:[true,"please enter your name"],
        },
        email:{
            type:String,
            require:[true,"please enter your emailID"],
        },
        age:{
            type:Number,
            require:[true,"please enter your age"],
        },
        bloodGroup:{
            type:String,
            require:[true,"please enter your BloodGroup"],
        },
        gender:{
            type:String,
            require:[true,"please enter your gender"],
        },
        phoneNumber:{
            type:Number,
            require:[true,"please enter your number"],
        },
        password:{
            type:String,
            require:[true,"please enter your name"],
        }

    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("User", userSchema);