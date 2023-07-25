const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const patientSchema = new Schema({
    name: {
        type: String,
        require: [true, 'name is required']
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
    // image:{
    //     type: String,
    //     require: [true, 'image is required']
    // },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

const patientValidSchema = Joi.object({
    name: Joi.string().required(),
    idcardnumber: Joi.string().min(13).max(13).required(),
    gender: Joi.string().min(3).max(30).required(),
    birthdate: Joi.date().required(),
    email: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(0).max(10).required(),
    address: Joi.string().min(3).max(30).required(),
    // image: Joi.string().required()
});

patientSchema.methods.validateInput = function (obj) {
    const schema = patientValidSchema;
    return schema.validate(obj);
}

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient
