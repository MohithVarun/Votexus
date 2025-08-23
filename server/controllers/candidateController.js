const {v4:uuid}=require("uuid")
const cloudinary=require('../utils/cloudinary')
const path=require("path")
const mongoose=require("mongoose")

const HttpError=require('../models/ErrorModel')
const ElectionModal = require('../models/electionModel')
const CandidateModel = require('../models/candidateModel')
const VoterModel = require('../models/voterModel')
const electionModel = require("../models/electionModel")

//===========ADD CANDIDATE
//post :api/candidates
//protected (only admin)
const addCandidate = async (req,res,next)=>{
    try {
        //only admin can add election
        if(!req.user.isAdmin){
            return next(new HttpError("Only an admin can perform this action.",403))
        }
        const {fullName,motto,currentElection}=req.body;
        if(!fullName || !motto){
            return next(new HttpError("Fill in all fields",422))
        }
        if(!req.files.image){
            return next(new HttpError("Choose an image.",422))
        }

        const {image}=req.files;
        //check file size
        if(image.size >1000000){
            return next(new HttpError("Image size should be less than 1mb",422))
        }
        //rename the image
        let fileName=image.name;
        fileName=fileName.split(".")
        fileName=fileName[0] +uuid() +"."+fileName[fileName.length-1]
        //upload file to uploads folder in project
        image.mv(path.join(__dirname,'..','uploads',fileName),async (err) => {
            if(err){
                return next(new HttpError(error))
            }
            //store image on cloudinary
            const result = await cloudinary.uploader.upload(path.join(__dirname,'..','uploads',fileName),{resource_type: "image"})
            if(!result.secure_url){
                return next(new HttpError("Couldn't upload image to cloudinary"))
            }
            //add candidate to db
            let newCandidate= await CandidateModel.create({fullName,motto,image:result.secure_url,election: currentElection})

            //get election and push candidate to election
            let election = await ElectionModal.findById(currentElection)

            const sess =await mongoose.startSession()
            sess.startTransaction()
            await newCandidate.save({session: sess})
            election.candidates.push(newCandidate)
            await election.save({session: sess})
            await sess.commitTransaction()

            res.status(201).json("Candidate added successfully")
        })
    } catch (error) {
        return next(new HttpError(error))
    }
}



//===========GET CANDIDATE
//GET :api/candidates/:id
//protected 
const getCandidate = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const candidate = await CandidateModel.findById(id)
        res.json(candidate)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//===========delete CANDIDATE
//delete :api/candidates/:id
//protected (only admin)
const removeCandidate = async (req,res,next)=>{
    try {
        //only admin can add election
        if(!req.user.isAdmin){
            return next(new HttpError("Only an admin can perform this action.",403))
        }

        const {id} =req.params;
        let currentCandidate=await CandidateModel.findById(id).populate('election')
        if(!currentCandidate){
            return next(new HttpError("Couldn't delete candidate",422))
        } else{
            const sess=await mongoose.startSession()
            sess.startTransaction()
            await currentCandidate.deleteOne({session: sess})
            currentCandidate.election.candidates.pull(currentCandidate);
            await currentCandidate.election.save({session:sess})
            await sess.commitTransaction()

            res.status(200).json("Candidate deleted successfully.")
        }
    } catch (error) {
        return next(new HttpError(error))
    }
}

//===========VOTE CANDIDATE
//patch :api/candidates/:id
//protected
const voteCandidate = async (req,res,next)=>{
    try {
        const {id: candidateId}=req.params;
        const {selectedElection} =req.body;
        //get the candidate
        const candidate = await CandidateModel.findById(candidateId);
        const newVoteCount = candidate.voteCount +1;
        //update candidate's votes
        await CandidateModel.findByIdAndUpdate(candidateId, {voteCount: newVoteCount},{new: true})
        //start session for relationship between voters and election
        const sess = await mongoose.startSession()
        sess.startTransaction();
        //get the current voter
        let voter = await VoterModel.findById(req.user.id)
        await voter.save({session: sess})
        //get selected election
        let election = await electionModel.findById(selectedElection);
        election.voters.push(voter);
        voter.votedElections.push(election);
        await election.save({session: sess})
        await voter.save({session: sess})
        await sess.commitTransaction();
        res.status(200).json(voter.votedElections)
    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports={addCandidate,getCandidate,removeCandidate,voteCandidate}