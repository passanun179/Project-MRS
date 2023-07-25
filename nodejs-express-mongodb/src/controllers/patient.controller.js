const response = require('../models/response.models');
const patientSchema = require('../models/patients.models');

const patientController = {}

patientController.index = async (req, res) => {
    try {
        const patients = await patientSchema.find();
        return response.success(res, patients, 'Success', 200);
    } catch (err) {
        return response.error(res, patients, 'Failed', 500);
    }
}

patientController.store = async (req, res) => {
    console.log(req.body)
    const patient = new patientSchema(req.body);
    const { error, value } = await patient.validateInput(req.body);
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        return response.error(res, errorMessage, 'validation error', 400);
    }
    try {
        var result = await patient.save();
        return response.success(res, result, 'Success add patient', 200);
    } catch (err) {
        return response.error(res, err, 'Failed', 500);
    }
}

patientController.show = async (req, res) => {

    const exit = await getpatientById(req.params.id);
    if (!exit) {
        return response.error(res, 'patient not found', 'Failed', 404);
    }

    try {
        var result = await patientSchema.findById(req.params.id);
        if (result) {
            return response.success(res, result, 'Success', 200);
        } else {
            return response.error(res, result, 'patient not found', 'Failed', 500);
        }
    } catch (err) {
        return response.error(res, err, 'Failed', 500);
    }
}

patientController.update = async (req, res) => {

    const exit = await getpatientById(req.params.id);
    if (!exit) {
        return response.error(res, 'patient not found', 'Failed', 404);
    }

    try {
        var patient = await patientSchema.findById(req.params.id);
        var body = req.body;

        if (req.params.id !== patient.id) {
            return response.error(res, patient, 'patient not found', 'Failed', 500);
        }
        var data = {
            name: body.name || patient.name,
            idcardnumber: body.idcardnumber || patient.idcardnumber,
            gender: body.gender || patient.gender,
            birthdate: body.birthdate || patient.birthdate,
            email: body.email || patient.email,
            phone: body.phone || patient.phone,
            address: body.address || patient.address,
            // image: body.image || patient.image,
            createAt: patient.createAt,
            updateAt: Date.now().toString(),
        }

        const updateSchema = new patientSchema(req.body);
        const { error, value } = await updateSchema.validateInput(req.body);

        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return response.error(res, errorMessage, 'validation error', 400);
        }

        var update = await patientSchema.findByIdAndUpdate(req.params.id, data, { new: true });
        if (update) {
            return response.success(res, update, 'Success', 200);
        } else {
            return response.error(res, 'patient not found', 'Failed', 404);
        }
    } catch (err) {
        return response.error(res, err, 'Failed', 500);
    }
}

patientController.destroy = async (req, res) => {

    const exit = await getpatientById(req.params.id);
    if (!exit) {
        return response.error(res, 'patient not found', 'Failed', 404);
    }

    try {
        var result = await patientSchema.findByIdAndDelete(req.params.id);

        if (result) {
            return response.success(res, null, 'Success', 200);
        } else {
            return response.error(res, null, 'patient not found', 'Failed', 500);
        }
    } catch (err) {

        return response.error(res, err, 'Failed', 500);
    }
}

// const getpatientByEmail = (email) => {
//     return patientSchema.findOne({
//         email: email,
//     });
// }

const getpatientById = (id) => {
    return patientSchema.findById(id);
}



module.exports = patientController;