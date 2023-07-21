const response = require('../models/response.models');
const userSchema = require('../models/users.models');

const userController = {}

userController.index = async (req, res) => {
    try {
        const users = await userSchema.find();
        return response.success(res, users, 'Success', 200);
    } catch (err) {
        return response.error(res, users, 'Failed', 500);
    }
}

userController.store = async (req, res) => {
    const user = new userSchema(req.body);
    const { error, value } = await user.validateInput(req.body);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return response.error(res, errorMessage, 'validation error', 400);
    }
    try {
        var result = await user.save();
        return response.success(res, result, 'Success', 200);
    } catch (err) {
        return response.error(res, err, 'Failed', 500);
    }
}

userController.show = async (req, res) => {

    const exit = await getUserById(req.params.id);
    if (!exit) {
        return response.error(res, 'User not found', 'Failed', 404);
    }

    try {
        var result = await userSchema.findById(req.params.id);
        if (result) {
            return response.success(res, result, 'Success', 200);
        } else {
            return response.error(res, result, 'User not found', 'Failed', 500);
        }
    } catch (err) {
        return response.error(res, err, 'Failed', 500);
    }
}

userController.update = async (req, res) => {

    const exit = await getUserById(req.params.id);
    if (!exit) {
        return response.error(res, 'User not found', 'Failed', 404);
    }

    try {
        var user = await userSchema.findById(req.params.id);
        var body = req.body;

        if (req.params.id !== user.id) {
            return response.error(res, user, 'User not found', 'Failed', 500);
        }
        var data = {
            firstname: body.firstname || user.firstname,
            lastname: body.lastname || user.lastname,
            idcardnumber: body.idcardnumber || user.idcardnumber,
            gender: body.gender || user.gender,
            birthdate: body.birthdate || user.birthdate,
            email: body.email || user.email,
            phone: body.phone || user.phone,
            address: body.address || user.address,
            createAt: user.createAt,
            updateAt: Date.now().toString(),
        }

        const updateSchema = new userSchema(req.body);
        const { error, value } = await updateSchema.validateInput(req.body);

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return response.error(res, errorMessage, 'validation error', 400);
        }

        var update = await userSchema.findByIdAndUpdate(req.params.id, data, { new: true });
        if (update) {
            return response.success(res, update, 'Success', 200);
        } else {
            return response.error(res, 'User not found', 'Failed', 404);
        }
    } catch (err) {
        return response.error(res, err, 'Failed', 500);
    }
}

userController.destroy = async (req, res) => {

    const exit = await getUserById(req.params.id);
    if (!exit) {
        return response.error(res, 'User not found', 'Failed', 404);
    }

    try {
        var result = await userSchema.findByIdAndDelete(req.params.id);

        if (result) {
            return response.success(res, null, 'Success', 200);
        } else {
            return response.error(res, null, 'User not found', 'Failed', 500);
        }
    } catch (err) {

        return response.error(res, err, 'Failed', 500);
    }
}

const getUserByEmail = (email) => {
    return userSchema.findOne({
        email: email,
    });
}

const getUserById = (id) => {
    return userSchema.findById(id);
}



module.exports = userController;