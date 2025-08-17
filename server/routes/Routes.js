const {Router} =require("express")


const {registerVoter,loginVoter,getVoter} =require("../controllers/voterController")
const {addElection,getElections,getElection,updateElection,removeElection,getCandidatesOfElection,getElectionVoters}=require("../controllers/electionController")
const {addCandidate,getCandidate,removeCandidate,voteCandidate}=require('../controllers/candidateController')

const authMiddleware =require('../middleware/authMiddleware')

const router=Router()

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});


router.get('/debug/elections', async (req, res) => {
    try {
        const ElectionModal = require('../models/electionModel');
        const elections = await ElectionModal.find();
        res.json({
            count: elections.length,
            elections: elections
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/debug/add-sample-election', async (req, res) => {
    try {
        const ElectionModal = require('../models/electionModel');
        
        // Check if there are already elections
        const existingCount = await ElectionModal.countDocuments();
        if (existingCount > 0) {
            return res.json({ message: 'Sample elections already exist', count: existingCount });
        }
        
        // Create a sample election
        const sampleElection = await ElectionModal.create({
            title: 'Sample Election 2023',
            description: 'This is a sample election for testing purposes',
            club: 'https://res.cloudinary.com/dwscasaml/image/upload/v1689847204/cld-sample-5.jpg'
        });
        
        res.json({ message: 'Sample election created successfully', election: sampleElection });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/voters/register',registerVoter);
router.post('/voters/login',loginVoter);
router.get('/voters/:id',authMiddleware, getVoter);

router.post('/elections',authMiddleware,addElection)
router.get('/elections',authMiddleware, getElections)
router.get('/elections/:id',authMiddleware, getElection)
router.delete('/elections/:id',authMiddleware, removeElection)
router.patch('/elections/:id',authMiddleware, updateElection)
router.get('/elections/:id/candidates',authMiddleware, getCandidatesOfElection)
router.get('/elections/:id/voters',authMiddleware, getElectionVoters)

router.post('/candidates',authMiddleware,addCandidate)
router.get('/candidates/:id',authMiddleware,getCandidate)
router.delete('/candidates/:id',authMiddleware,removeCandidate)
router.patch('/candidates/:id',authMiddleware,voteCandidate)



module.exports=router

