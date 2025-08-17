import React, { useEffect, useState } from 'react'
// import { elections as dummyElections } from '../data'
import ResultElection from '../components/ResultElection'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Results = () => {
  const token=useSelector(state=>state?.vote?.currentVoter?.token)
  const navigate=useNavigate()

  //ACCESS CONTROL
  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  },[])

  const [elections,setElections]=useState([])

  const getElections = async (e) =>{
    try {
      console.log('Fetching elections with token:', token);
      console.log('API URL:', process.env.REACT_APP_API_URL);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections`,{withCredentials: true,headers: {Authorization: `Bearer ${token}`}})
      console.log('Elections API response:', response);
      const elections = await response.data;
      console.log('Elections data:', elections);
      setElections(elections)
    } catch (error) {
      console.error('Error fetching elections:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      }
    }
  }

  useEffect(()=>{
    if (token) {
      getElections();
    }
  },[token])

  return (
    <section className="results">
      <div className="container results__container">
        {
          elections.map(election => <ResultElection key={election._id} {...election} />)
        }
      </div>
    </section>
  )
}

export default Results
