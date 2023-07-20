const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/user', userController.index); //get all user
router.post('/user', userController.store); // add user
router.get('/user/:id', userController.show); //get user by id
router.put('/user/:id', userController.update); // update user
router.delete('/user/:id', userController.destroy); // remove user


module.exports = router;