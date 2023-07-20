const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const employeeSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        minlength: [3, 'Password must be at least 3 characters long'],
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        minlength: [3, 'Email must be at least 3 characters long'],
        unique: true
    },
    address: {
        type: String,
        require: [true, 'Address is required'],
        minlength: [3, 'Address must be at least 3 characters long'],
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

const employeeValidSchema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
});

employeeSchema.methods.validateInput = function (data) {
    return employeeValidSchema.validate(data);
}

module.exports = mongoose.model("Employee", employeeSchema);

