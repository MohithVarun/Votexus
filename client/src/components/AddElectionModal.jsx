import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'
import AlertModal from './AlertModal'


const AddElectionModal = () => {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [club,setClub]=useState("")
  const [isLoading,setIsLoading]=useState(false)

  const dispatch=useDispatch()
  const alertModalShowing = useSelector(state => state.ui.alertModalShowing)
  const alertModalData = useSelector(state => state.ui.alertModalData)

  //close add election modal
  const closeModal = () =>{
    dispatch(UiActions.closeElectionModal())
  }

  const token=useSelector(state=>state?.vote?.currentVoter?.token)

  const createElection = async (e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
      const electionData=new FormData()
      electionData.append('title',title)
      electionData.append('description',description)
      electionData.append('club',club)
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/elections`,electionData,{
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
        message: error.response?.data?.message || "Failed to create election. Please try again."
      }))
    }
  }

  return (
    <section className="modal">
        <div className="modal__content">
          <header className="modal__header">
            <h4>Create New Election</h4>
            <button className="modal__close" onClick={closeModal}><IoMdClose /></button>
          </header>
          <form onSubmit={createElection}>
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
            <button type="submit"  className="btn primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Adding...
                </>
              ) : (
                'Add Election'
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

export default AddElectionModal


