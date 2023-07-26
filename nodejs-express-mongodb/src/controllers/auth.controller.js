const config = require("../config/auth");
const employeeSchema = require("../models/employee.models");
const response = require("../models/response.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const authenticationController = {};


authenticationController.signup = async (req, res) => {

    const employee = new employeeSchema(req.body);

    const { error, value } = await employee.validateInput(req.body);

    const checkDuplicateEmail = await employeeSchema.findOne({
        email: req.body.email,
    });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    employee.password = hashPassword;

    if (checkDuplicateEmail) {
        return response.error(res, 'Email already exists', 'Failed', 500);
    }

    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return response.error(res, errorMessage, 'validation error', 400);
    }

    try {
        var result = await employee.save();
        var responseData = {
            id: result.id,
            name: result.name,
            email: result.email,
        }

        return response.success(res, responseData, 'Success', 200);

    } catch (err) {
        return response.error(res, err, 'Failed', 500);
    }

}


authenticationController.signin = async (req, res) => {

    const body = req.body;
console.log(body);
    if (body.email == null || body.password == null || body.email == '' || body.password == '' || body.email == undefined || body.password == undefined) {
        return response.error(res, 'Error missing email or password is invalid !', 'Failed', 500);
    }

    const empExit = await employeeSchema.findOne({
        email: req.body.email,
    });

    if (!empExit) {
        return response.error(res, 'Error email or password not match', 'Failed', 500);
    }

    const validPass = await bcrypt.compare(req.body.password, empExit.password);

    if (!validPass) {
        return response.error(res, 'Error email or password not match', 'Failed', 500);
    }

    const accessToken = jwt.sign({ id: empExit.id }, config.secret, {
        expiresIn: '15d',
        issuer: config.issuer,
    });

    const refreshToken = jwt.sign({ id: empExit.id }, config.secret, {
        expiresIn: '15d',
        issuer: config.issuer,
    });


    const responseData = {
        "accessToken": accessToken,
        "refreshToken": refreshToken,
    }

    return response.success(res, responseData, 'Success', 200);

}

authenticationController.refreshToken = async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        if (!token) return response.error(res, 'Access denied. No token provided.', 'Failed', 403);

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        const empExit = await employeeSchema.findOne({
            _id: decoded.id,
        });

        if (!empExit) {
            return response.error(res, 'Error id not found', 'Failed', 500);
        }
        const accessToken = jwt.sign({ id: decoded.id }, config.secret, {
            expiresIn: '14d',
            issuer: config.issuer,
        });

        const refreshToken = jwt.sign({ id: decoded.id }, config.secret, {
            expiresIn: '14d',
            issuer: config.issuer,
        });

        const responseData = {
            "accessToken": accessToken,
            "refreshToken": refreshToken,
        }

        return response.success(res, responseData, 'Success', 200);


    } catch (error) {
        return response.error(res, 'Invalid token.', 'Failed', 400);
    }



}


module.exports = authenticationController;