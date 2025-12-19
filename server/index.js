const express=require("express")
const cors=require("cors")
const {connect}=require("mongoose")
require("dotenv").config()
const upload=require("express-fileupload")

const Routes=require("./routes/Routes")
const {notFound,errorHandler}=require("./middleware/errorMiddleware")

const app=express()
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))

// CORS Configuration - supports multiple origins for production
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ["http://localhost:3000"]

app.use(cors({
  credentials: true, 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use(upload())

app.use('/api',Routes)

app.use(notFound)
app.use(errorHandler)

// Add more detailed logging for MongoDB connection
console.log('Attempting to connect to MongoDB server...');
connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });