const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(request, response, next) => {
    let token;
    let authHeader = request.headers.Authorization || request.headers["authorization"];
    //console.log(authHeader);
    if (authHeader && authHeader.startsWith("Bearer ")) {
        //console.log(authHeader);
        token = authHeader.split(" ")[1];
        //console.log(token);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

            if (err) {
                response.status(401);
                throw new Error("User is not Authorized");
            }

            request.user = decoded.user;
            next();
        });
        if (!token) {
            response.status(401);
            throw new Error("User is not authorized or token is missing in the request");
        }
    }
});

module.exports = validateToken;