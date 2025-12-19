//rafce

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Candidate from '../components/Candidate'
import ConfirmVote from '../components/ConfirmVote'
import {useSelector} from 'react-redux'
import axios from 'axios'

const Candidates = () => {
  
  const token=useSelector(state=>state?.vote?.currentVoter?.token)
  const navigate=useNavigate()

  //ACCESS CONTROL
  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  },[])

  const {id: selectedElection} =useParams()
  const [candidates,setCandidates]=useState([])
  const [canVote,setCanVote]=useState(true);

  const voteCandidateModalShowing = useSelector(state=>state.ui.voteCandidateModalShowing)

  const voterId=useSelector(state => state?.vote?.currentVoter?.id)
  const votedElections = useSelector(state => state?.vote?.currentVoter?.votedElections)
  const getCandidates = async ()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections/${selectedElection}/candidates`,{withCredentials:true,headers: {Authorization: `Bearer ${token}`}})
      setCandidates(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  //check if voter has already voted
  const getVoter = async ()=>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/voters/${voterId}`,{withCredentials: true,headers: {Authorization: `Bearer ${token}`}})
      const votedElections = await response.data.votedElections;
      if(votedElections.includes(selectedElection)){
        setCanVote(false)
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getCandidates()
    getVoter()
    // if(votedElections.includes(selectedElection)){
    //         setCanVote(false)
    //   }
  },[])


  return (
    <>
      <section className="candidates">
        {!canVote ? <header className="candidates__header">
          <h1>Already Voted</h1>
          <p>You are permitted to vote once in this election.Please vote in another election or sign out.
          </p>
        </header> : <>{candidates.length>0 ? <header className="candidates__header">
          <h1>Vote your candidate</h1>
          <p>These are the candidates for the selected election.please vote once and wisely,
            because you won't be allowed to vote in this election again.
          </p>
        </header> : (
          <div className="empty-state">
            <div className="empty-state__icon">👥</div>
            <h2>No Candidates Yet</h2>
            <p>This election is still being set up. Candidates will be added soon!</p>
            <p className="empty-state__subtext">Check back later to cast your vote! 🗳️</p>
          </div>
        )}
        {candidates.length > 0 && (
          <div className="container candidates__container">
            {candidates.map(candidate => <Candidate key={candidate._id} {...candidate} />)}
          </div>
        )}
        </>}
      </section>

      {voteCandidateModalShowing && <ConfirmVote selectedElection={selectedElection}/>}
    </>
  )
}

export default Candidates
