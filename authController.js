const User = require('./models/User.js');
const Role = require('./models/Role.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require('./config.js')


const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	}

	return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController{
	async registration(req, res){
		try{
			const errors = validationResult(req)
			if(!errors.isEmpty()){
				return res.status(400).json({message:'error about refistration', errors})
			}
			const {username, password} = req.body;
			const candidate = await User.findOne({username})
			if(candidate){
				return res.status(400).json({message: 'User alrady create'})
			}
			const changePassword = bcrypt.hashSync(password, 4)
			const userRole = await Role.findOne({value: 'admin'})
			const user = new User({username, password: changePassword, roles: [userRole.value]})
			await user.save()
			return res.json({message: 'User create'})
		}catch(e){
			console.log(e)
			res.status(400).json({message: 'registration error'})
		}
	}

	async login(req, res){
		try{
			const {username, password} = req.body;
			const user = await User.findOne({username});
			if(!user){
				return res.status(400).json('user dont fond')
			}
			const validPassword = bcrypt.compareSync(password, user.password)
			console.log(password)
			console.log(user.password)

			if(!validPassword){
				return res.status(400).json({message: 'wrong rasswotd'})
			}
			const token = generateAccessToken(user._id, user.roles)
			return res.json({token})
		}catch(e){
			console.log(e)
				res.status(400).json({message: 'Login error'})
		}
	}

	async getAll(req, res){
		try{
			const userRole = new Role()
			const adminRole = new Role({value: 'ADMIN'})
			await userRole.save()
			await adminRole.save()

		}catch(e){
			console.log(e)
		}
	}
}


module.exports = new authController()