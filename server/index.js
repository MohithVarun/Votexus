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
app.use(cors({credentials:true, origin: true}))
app.use(upload())

app.use('/api',Routes)

app.use(notFound)
app.use(errorHandler)

// Add more detailed logging for MongoDB connection
console.log('Attempting to connect to MongoDB at:', process.env.MONGODB_URI);
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