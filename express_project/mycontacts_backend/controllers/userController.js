const asyncHandler = require("express-async-handler");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register the user
//@route /api/user/register
//@access : public
const registerUser = asyncHandler(async(request, response) => {
    const { username, email, password } = request.body;
    if (!username || !email || !password) {
        response.status(400);
        throw new Error("All Feilds are Mandatory");
    }
    const userAvailable = await User.findOne({ email });
    //console.log(userAvailable);
    if (userAvailable) {
        response.status(400);
        throw new Error("User already exists");
    }

    //Hash Password 

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User Created Successfully ${user}`);
    if (user) {
        response.status(201).json({ _id: user.id, email: user.email });

    } else {
        response.status(400);
        throw new Error("User data is not valid");
    }


    response.json({ message: "Register the user" });
});

//@desc Login the user  
//@route /api/user/login
//@access : public
const loginUser = asyncHandler(async(request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        response.status("400");
        throw new Error("All Feilds are mandatory");
    }
    const user = await User.findOne({ email });
    //compare passsword with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },

        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "59m" });
        response.status(200).json({ accessToken });
    } else {
        response.status(401);
        throw new Error("Email or password is not valid")
    }

});

//@desc  Current user
//@route /api/user/current
//@access : public
const currentUser = asyncHandler(async(request, response) => {
    response.json(request.user);
});

module.exports = { registerUser, loginUser, currentUser };