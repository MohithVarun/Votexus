const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const VoterModel=require('../models/voterModel')
const HttpError=require('../models/ErrorModel')


//===========Register new voter 
//post :api/voters/register
//unprotected
const registerVoter = async (req,res,next)=>{
    console.log('Register voter endpoint hit');
    console.log('Request body:', req.body);
    
    try{
        const {fullName,email,password,password2}=req.body;
        console.log('Extracted data:', { fullName, email, password: '***', password2: '***' });
        
        if(!fullName || !email ||!password || !password2){
            console.log('Validation error: Missing required fields');
            return next(new HttpError("Fill in all fields.",422))
        }
        
        //make all emails lowercased
        const newEmail = email.toLowerCase()
        console.log('Normalized email:', newEmail);
        
        //check if the email already exsits in db
        console.log('Checking if email exists in database...');
        const emailExists = await VoterModel.findOne({email: newEmail})
        if(emailExists){
            console.log('Email already exists in database');
            return next(new HttpError("Email already exist.",422))
        }
        console.log('Email is available');
        
        //make sure password 6+ characters
        if((password.trim().length)<6){
            console.log('Password too short');
            return next(new HttpError("Password should atleast 6 characters.",422))
        }
        
        //make sure passwords match
        if(password !=password2){
            console.log('Passwords do not match');
            return next(new HttpError("Passwords do not match",422))
        }
        console.log('Password validation passed');
        
        // hash password
        console.log('Hashing password...');
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        // No user/voter should be admin except for one with email "admin@gmail.com"
        let isAdmin=false;
        if(newEmail == "admin@gmail.com"){
            console.log('Admin account detected');
            isAdmin=true
        }
        
        //save new voter to db
        console.log('Creating new voter in database...');
        const newVoter = await VoterModel.create({fullName,email:newEmail,password:hashedPassword,isAdmin})
        console.log('New voter created successfully:', newVoter._id);
        
        res.status(201).json(`New voter ${fullName} created.`)
    }catch (error){
        console.error('Registration error:', error);
        return next(new HttpError("Voter registration failed.",422))
    }
}






//function to generate token
const generateToken =(payload) =>{
    const token=jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: "1d"})
    return token;
}



//===========Login new voter 
//post :api/voters/login
//unprotected
const loginVoter = async (req,res,next)=>{
    console.log('Login voter endpoint hit');
    console.log('Request body:', req.body);
    
    try{
        const {email,password}=req.body;
        console.log('Extracted data:', { email, password: '***' });
        
        if(!email || !password){
            console.log('Validation error: Missing required fields');
            return next(new HttpError("Fill in all fields.",422))
        }
        
        const newEmail=email.toLowerCase()
        console.log('Normalized email:', newEmail);
        
        console.log('Searching for voter in database...');
        const voter = await VoterModel.findOne({email: newEmail})
        if(!voter){
            console.log('Voter not found in database');
            return next(new HttpError("Invalid credentials.",422))
        }
        console.log('Voter found:', voter._id);
        
        //compare passwords
        console.log('Comparing passwords...');
        const comparePass = await bcrypt.compare(password,voter.password)
        if(!comparePass){
            console.log('Password comparison failed');
            return next(new HttpError("Invalid credentials.",422))
        }
        console.log('Password comparison successful');
        
        const {_id:id,isAdmin,votedElections}=voter;
        console.log('Generating token...');
        const token=generateToken({id,isAdmin})
        console.log('Token generated successfully');

        console.log('Login successful for user:', id);
        res.json({token,id,votedElections,isAdmin})
    }catch (error){
        console.error('Login error:', error);
        return next(new HttpError("Login failed. Please check your credentials or try again later.",422))
    }
}

//===========get voter 
//get :api/voters/:id
//protected
const getVoter = async (req,res,next)=>{
    try{
        const {id} =req.params;
        const voter=await VoterModel.findById(id).select("-password")
        res.json(voter)
    }catch(error){
        return next(new HttpError("Couldn't get voter",404))
    }
}


module.exports={registerVoter,loginVoter,getVoter}
