const router = require('express').Router();
const patientController = require('../controllers/patient.controller');

router.get('/patient', patientController.index); //get all patient
router.post('/patient', patientController.store); // add patient
router.get('/patient/:id', patientController.show); //get patient by id
router.put('/patient/:id', patientController.update); // update patient
router.delete('/patient/:id', patientController.destroy); // remove patient


module.exports = router;