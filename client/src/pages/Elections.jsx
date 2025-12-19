import React, { useEffect, useState } from 'react'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import UpdateElectionModal from '../components/UpdateElectionModal'
import AlertModal from '../components/AlertModal'
import axios from 'axios'
import Loader from'../components/Loader'
import { useNavigate } from 'react-router-dom'

const Elections = () => {
  const token=useSelector(state=>state?.vote?.currentVoter?.token)
  const navigate=useNavigate()

  //ACCESS CONTROL
  useEffect(()=>{
    if(!token){
      navigate('/')
    }
  },[])

  
  const [elections,setElections] =useState([])
  const [isLoading,setIsLoading] = useState(false);
  const dispatch=useDispatch()

  //open add election modal
  const openModal =() => {
    dispatch(UiActions.openElectionModal())
  }
  const isAdmin=useSelector(state=>state?.vote?.currentVoter?.isAdmin)
  const electionModalShowing=useSelector(state => state.ui.electionModalShowing)
  const updateElectionModalShowing=useSelector(state => state.ui.updateElectionModalShowing)
  const alertModalShowing = useSelector(state => state.ui.alertModalShowing)
  const alertModalData = useSelector(state => state.ui.alertModalData)

  const getElections = async ()=>{
    setIsLoading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/elections`,{withCredentials:true,headers:{Authorization: `Bearer ${token}`}})
      setElections(response.data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    getElections()
  },[])

  return (
    <>
      <section className="elections">
        <div className="container elections__container">
          <header className="elections__header">
            <h1>Ongoing Elections</h1>
            {isAdmin && <button className="btn primary" onClick={openModal}>Create New Election</button>}
          </header>
          {isLoading ? <Loader/> : elections.length > 0 ? (
            <menu className="elections__menu">
              {elections.map(election => <Election key={election._id} {...election} />)}
            </menu>
          ) : (
            <div className="empty-state">
              <div className="empty-state__icon">🗳️</div>
              <h2>No Elections Yet</h2>
              <p>Looks like there are no ongoing elections at the moment. Check back soon for exciting voting opportunities!</p>
              <p className="empty-state__subtext">New elections are being set up regularly. Stay tuned! 🎉</p>
            </div>
          )}
        </div>
      </section>

      {electionModalShowing && <AddElectionModal />}
      {updateElectionModalShowing && <UpdateElectionModal />}
      {alertModalShowing && alertModalData && (
        <AlertModal type={alertModalData.type} message={alertModalData.message} />
      )}
    </>
  )
}

export default Elections
