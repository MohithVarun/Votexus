import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'
import AlertModal from './AlertModal'



const UpdateElectionModal = () => {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [club,setClub]=useState("")
  const [isLoading,setIsLoading]=useState(false)

  const dispatch=useDispatch()
  const idOfElectionToUpdate=useSelector(state=>state?.vote?.idOfElectionToUpdate)
  const token=useSelector(state=>state?.vote?.currentVoter?.token)
  const alertModalShowing = useSelector(state => state.ui.alertModalShowing)
  const alertModalData = useSelector(state => state.ui.alertModalData)

  //close update election modal
  const closeModal = () =>{
    dispatch(UiActions.closeUpdateElectionModal())
  }

  const fetchElection = async () =>{
    try {
      const response= await axios.get(`${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,{withCredentials:true,headers:{Authorization: `Bearer ${token}`}})
      const election=await response.data
      setTitle(election.title)
      setDescription(election.description)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchElection()
  },[])


  const updateElection= async (e) =>{
    e.preventDefault()
    try {
      setIsLoading(true)
      const electionData = new FormData();
      electionData.append('title',title)
      electionData.append('description',description)
      // Only append club if a new file is selected
      if(club){
        electionData.append('club',club)
      }
      await axios.patch(`${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,electionData,{
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      // Reset form
      setTitle("")
      setDescription("")
      setClub("")
      setIsLoading(false)
      closeModal()
      // Reload page to refresh elections list
      window.location.reload()
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      dispatch(UiActions.openAlertModal({
        type: 'error',
        message: error.response?.data?.message || "Failed to update election. Please try again."
      }))
    }
  }


  return (
    <section className="modal">
        <div className="modal__content">
          <header className="modal__header">
            <h4>Edit Election</h4>
            <button className="modal__close" onClick={closeModal}><IoMdClose /></button>
          </header>
          <form onSubmit={updateElection}>
            <div>
              <h6>Election Title:</h6>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} name='title'/>
            </div>
            <div>
              <h6>Election Description:</h6>
              <input type="text" value={description} name='description' onChange={e => setDescription(e.target.value)}/>
            </div>
            <div>
              <h6>Election Club:</h6>
              <input type="file" name='club' onChange={e => setClub(e.target.files[0])} accept="png,jpg,jpeg,webp,avif"/>
            </div>
            <button type="submit" className="btn primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Updating...
                </>
              ) : (
                'Update Election'
              )}
            </button>
          </form>
        </div>
        {alertModalShowing && alertModalData && (
          <AlertModal type={alertModalData.type} message={alertModalData.message} />
        )}
    </section>
  )
}

export default UpdateElectionModal
