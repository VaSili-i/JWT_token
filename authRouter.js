const Router = require('express');
const router = new Router();
const authController = require('./authController.js');
const {check} = require('express-validator')
const authMiddleware = require('./midllewares/authMiddleware.js')
const roleMiddleware = require('./midllewares/roleMiddleware.js')

router.post('/reqistration', [
	check('username', 'dont be hole').notEmpty(),
	check('password', 'min is 4 max is 10').isLength({min: 4, max: 10})
	], authController.registration)
router.post('/login', authController.login)
router.get('/users', roleMiddleware(['admin']), authController.getAll)

module.exports = router