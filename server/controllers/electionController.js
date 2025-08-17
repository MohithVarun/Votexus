const cloudinary = require('../utils/cloudinary')

const HttpError = require('../models/ErrorModel')
const ElectionModal = require('../models/electionModel')
const CandidateModel = require('../models/candidateModel')

//===========ADD NEW ELECTION
//post :api/elections
//protected (only admin)
const addElection = async(req,res,next)=>{
   try {
        //only admin can add election
        if(!req.user.isAdmin){
            return next(new HttpError("Only an admin can perform this action.",403))
        }

        const {title,description}=req.body;
        if(!title || !description){
            return next(new HttpError("Fill all fields.",422))
        }

        if(!req.files.club){
            return next(new HttpError("Choose a club.",422))
        }

        const {club}=req.files;
        // Increase size limit to 2mb and optimize image upload
        if(club.size > 2000000) {
            return next(new HttpError("File size too big. Should be less than 2mb"))
        }

        // Upload directly to cloudinary with optimization
        const result = await cloudinary.uploader.upload(club.tempFilePath, {
            resource_type: "image",
            quality: "auto",
            fetch_format: "auto",
            flags: "progressive"
        })

        if(!result.secure_url){
            return next(new HttpError("Couldn't upload image to cloudinary",422))
        }

        // Save election to db with optimized query
        const newElection = await ElectionModal.create({
            title,
            description,
            club: result.secure_url
        }, { lean: true })

        res.status(201).json({
            message: "Election created successfully",
            election: newElection
        })
   } catch (error) {
    return next(new HttpError(error))
   }
}





//===========get all ELECTION
//get :api/elections
//protected 
const getElections = async(req,res,next)=>{
    try {
        const elections = await ElectionModal.find();
        res.status(200).json(elections)
    } catch (error) {
        return next(new HttpError(error))
    }
}





//===========GET SINGLE ELECTION
//get :api/elections/:id
//protected 
const getElection = async(req,res,next)=>{
    try {
        const {id} =req.params;
        const election = await ElectionModal.findById(id)
        res.status(200).json(election)
    } catch (error) {
        return next(new HttpError(error))
    }
}





//=========== get ELECTION candidates
//get :api/elections/id/candidates
//protected 
const getCandidatesOfElection = async (req,res,next)=>{
    try {
        const {id}=req.params;
        const candidates = await CandidateModel.find({election: id})
        res.status(200).json(candidates)

    } catch (error) {
        return next(new HttpError(error))
    }
}





//===========get voters of ELECTION
//get :api/elections/:id/voters
//protected 
const getElectionVoters = async (req,res,next)=>{
    try {
        const {id} =req.params;
        const respone = await ElectionModal.findById(id).populate('voters')
        res.status(200).json(respone.voters)
    } catch (error) {
        return next(new HttpError(error))
    }
}





//===========update ELECTION
//patch :api/elections/id
//protected (only admin)
const updateElection = async (req,res,next)=>{
    try {
        //only admin can add election
        if(!req.user.isAdmin){
            return next(new HttpError("Only an admin can perform this action.",403))
        }
        const {id}=req.params;
        const {title,description} = req.body;
        if(!title || !description){
            return next(new HttpError("Fill in all fields.",422))
        }
        let updateData = { title, description };

        if(req.files && req.files.club) {
            const {club} = req.files;
            // Increase size limit to 2mb and optimize image upload
            if(club.size > 2000000){
                return next(new HttpError("Image size too big. Should be less than 2mb", 422))
            }

            // Upload directly to cloudinary with optimization
            const result = await cloudinary.uploader.upload(club.tempFilePath, {
                resource_type: "image",
                quality: "auto",
                fetch_format: "auto",
                flags: "progressive"
            })

            if(!result.secure_url){
                return next(new HttpError("Image upload to cloudinary was not successful", 422))
            }

            updateData.club = result.secure_url;
        }

        const updatedElection = await ElectionModal.findByIdAndUpdate(
            id,
            updateData,
            { new: true, lean: true }
        );

        res.status(200).json({
            message: "Election updated successfully",
            election: updatedElection
        });

    } catch (error) {
        return next(new HttpError(error))
    }
}

//===========DELETE ELECTION
//delete :api/elections/:id
//protected (only admin)
const removeElection = async (req,res,next)=>{
    try {
        //only admin can add election
        if(!req.user.isAdmin){
            return next(new HttpError("Only an admin can perform this action.",403))
        }

        const {id} =req.params;
        await ElectionModal.findByIdAndDelete(id);
        //delete candidates that belong to this election
        await CandidateModel.deleteMany({election: id})
        res.status(200).json("Election deleted successfully.")
    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports={addElection,getElections,getElection,updateElection,removeElection,
getCandidatesOfElection,getElectionVoters}

