const constants = require("../constants");
const errorHandler = (err, request, response, next) => {

    const statusCode = !response.statusCode ? 500 : response.statusCode;
    //console.log(response.statusCode);404
    //console.log(statusCode);
    //console.log(constants.VALIDATION_ERROR);
    switch (statusCode) {

        case 400:
            response.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;
        case 404:
            response.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;
        case 401:
            response.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
            break;
        case 403:
            response.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        case 500:
            response.json({ title: "Server Error", message: err.message, stackTrace: err.stack });
            break;

        default:
            console.log("No Error! All is Good.");
            break;


    }


};

module.exports = errorHandler;