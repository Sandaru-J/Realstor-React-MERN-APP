import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log(err)
})

// const app = express()


// app.use(express.json())

// app.listen(3000, () =>{
//     console.log('server running on port 3000');
// });

// app.use('/API/user',userRouter);
// app.use('/API/auth',authRouter);

// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error"
//     return res.status(statusCode).json({
//         success:false,
//         statusCode,
//         message
//     });
// })

// const express = require('express');
// const cors = require('cors'); // Import the cors middleware
// const userRouter = require('/API/user',userRouter); // Replace with the correct path
// const authRouter = require('/API/auth',authRouter); // Replace with the correct path

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON requests
app.use(express.json());
app.use(cookieParser())

app.use('/API/user', userRouter);
app.use('/API/auth', authRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
