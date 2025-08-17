const cloudinary = require('../utils/cloudinary')

const HttpError = require('../models/ErrorModel')
const ElectionModal = require('../models/electionModel')
const CandidateModel = require('../models/candidateModel')
const VoterModel = require('../models/voterModel')

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
        // Increase size limit to 2mb and optimize image upload
        if(image.size > 2000000){
            return next(new HttpError("Image size should be less than 2mb", 422))
        }

        // Upload directly to cloudinary with optimization
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
            resource_type: "image",
            quality: "auto",
            fetch_format: "auto",
            flags: "progressive"
        })

        if(!result.secure_url){
            return next(new HttpError("Couldn't upload image to cloudinary"))
        }

        // Create candidate first
        const newCandidate = await CandidateModel.create({
            fullName,
            motto,
            image: result.secure_url,
            election: currentElection
        })

        // Then update election with the new candidate's ID
        await ElectionModal.findByIdAndUpdate(
            currentElection,
            { $push: { candidates: newCandidate._id } },
            { new: true, lean: true }
        )

        res.status(201).json({
            message: "Candidate added successfully",
            candidate: newCandidate
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
        // Update voter and election relationships
        await VoterModel.findByIdAndUpdate(
            req.user.id,
            { $push: { votedElections: selectedElection } }
        )
        
        await electionModel.findByIdAndUpdate(
            selectedElection,
            { $push: { voters: req.user.id } }
        )
        // Get updated voter data to return voted elections
        const updatedVoter = await VoterModel.findById(req.user.id)
        res.status(200).json(updatedVoter.votedElections)
    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports={addCandidate,getCandidate,removeCandidate,voteCandidate}

