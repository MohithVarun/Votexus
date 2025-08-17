import React, { useEffect, useState } from 'react'
// import { candidates } from '../data'
import CandidateRating from './CandidateRating'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from './Loader'


const ResultElection = ({_id: id,club,title}) => {
    const [totalVotes,setTotalVotes]=useState(0)
    const [electionCandidates, setElectionCandidates] = useState([])
    const [isLoading,setIsLoading]=useState(false);


    const token = useSelector(state=>state?.vote?.currentVoter.token);


    const getCandidates=async () =>{
        setIsLoading(true)
        try{
            console.log(`Fetching candidates for election ${id} with token:`, token);
            console.log('API URL:', process.env.REACT_APP_API_URL);
            const response=await axios.get(`${process.env.REACT_APP_API_URL}/elections/${id}/candidates`,{withCredentials:true,headers:{Authorization: `Bearer ${token}`}})
            console.log('Candidates API response:', response);
            const candidates = await response.data;
            console.log('Candidates data:', candidates);
            setElectionCandidates(candidates)
            //calculate the total votes in each election
            let totalVotesCount = 0;
            for(let i=0;i<candidates.length;i++){
                totalVotesCount += candidates[i].voteCount;
            }
            console.log('Total votes calculated:', totalVotesCount);
            setTotalVotes(totalVotesCount);
        }catch(error){
            console.error('Error fetching candidates:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
            }
        }
        setIsLoading(false)
    }

    useEffect(()=> {
        if (token && id) {
            getCandidates();
        }
    },[token, id])
    
  return (
    <>
        {isLoading && <Loader/> }
        <article className="result">
            <header className="result__header">
                <h4>{title}</h4>
                <div className="result__header-image">
                    <img src={club} alt={title} />
                </div>
            </header>
            <ul className="result__list">
                {
                    electionCandidates.map(candidate => <CandidateRating key={candidate.id} {...candidate} totalVotes={totalVotes}/>)
                }
            </ul>
            <Link to={`/elections/${id}/candidates`} className='btn primary full'>Enter Election</Link>
        </article>
    </>
  )
}

export default ResultElection

