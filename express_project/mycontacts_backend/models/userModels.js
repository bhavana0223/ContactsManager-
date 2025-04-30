const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please type your User name"],
    },

    email: {
        type: String,
        required: [true, "Please type your Email"],
        unique: [true, "Email already exists"],
    },

    password: {
        type: String,
        required: [true, "please enter your password"],
    },


}, {
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);