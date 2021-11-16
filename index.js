const express = require('express');
const authRouter = require('./authRouter.js');
const mongoose = require('mongoose');
const PORT = 5000;
const app = express();


app.use(express.json())
app.use('/auth', authRouter)

const start = async () =>{
	try{
		await mongoose.connect('mongodb+srv://user:12345dfcz@cluster0.y6bcs.mongodb.net/jwt_start?retryWrites=true&w=majority')
	app.listen(PORT, () => console.log(PORT))
	}catch(e){
		console.log(e)
	}
} 

start()