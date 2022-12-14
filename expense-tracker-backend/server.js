const express= require('express');
const dotenv=require('dotenv');
const colors=require('colors')
const morgan=require('morgan')
const connectDB=require('./config/db');
const cors=require('cors');
dotenv.config({path:'./config/config.env'})
const transactions=require('./routes/transactions');

connectDB();
const app=express();
if(process.env.NODE_ENV==='development'){
	app.use(morgan('dev'))
}

app.use(cors());
app.use(express.json());
app.use('/api/transactions',transactions)


const PORT=process.env.PORT||4000

app.listen(PORT,
	console.log(`server started on ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold));