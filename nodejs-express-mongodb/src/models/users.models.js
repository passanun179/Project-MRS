const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const userSchema = new Schema({
    firstname: {
        type: String,
        require: [true, 'firstname is required'],
        minlength: [3, 'firstname must be at least 3 characters long'],
        maxlength: [30, 'firstname cannot be longer than 30 characters']
    },
    lastname: {
        type: String,
        require: [true, 'lastname is required'],
        minlength: [3, 'lastname must be at least 3 characters long'],
        maxlength: [30, 'lastname cannot be longer than 30 characters']
    },
    idcardnumber: {
        type: String,
        require: [true, 'idcardnumber is required'],
        minlength: [13, 'idcardnumber must be at least 13 characters long'],
        maxlength: [13, 'idcardnumber cannot be longer than 13 characters']
    },
    gender: {
        type: String,
        require: [true, 'gender is required'],
        enum: ['male', 'female']
    },
    birthdate: {
        type: Date,
        require: [true, 'birthdate is required']
    },
    email: {
        type: String,
        require: [true, 'email is required'],
        minlength: [3, 'email must be at least 3 characters long'],
        maxlength: [30, 'email cannot be longer than 30 characters'],
        unique: true
    },
    phone:{
        type: String,
        require: [true, 'phone is required'],
        minlength: [0],
        maxlength: [10, 'phone cannot be longer than 10 characters']
    },
    address: {
        type: String,
        require: [true, 'address is required'],
        minlength: [3, 'address must be at least 3 characters long'],
        maxlength: [30, 'address cannot be longer than 30 characters']
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

const userValidSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    idcardnumber: Joi.string().min(13).max(13).required(),
    gender: Joi.string().min(3).max(30).required(),
    birthdate: Joi.date().required(),
    email: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(0).max(10).required(),
    address: Joi.string().min(3).max(30).required()
});

userSchema.methods.validateInput = function (obj) {
    const schema = userValidSchema;
    return schema.validate(obj);
}

const User = mongoose.model("User", userSchema);
module.exports = User
