import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const AddElectionModal = () => {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [club,setClub]=useState("")

  const dispatch=useDispatch()
  const navigate=useNavigate()

  //close add election modal
  const closeModal = () =>{
    dispatch(UiActions.closeElectionModal())
  }

  const token=useSelector(state=>state?.vote?.currentVoter?.token)

  const createElection = async (e)=>{
    e.preventDefault()
    try {
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
      closeModal()
      navigate(0)
    } catch (error) {
      console.log(error)
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
            <button type="submit"  className="btn primary">Add Election</button>
          </form>
        </div>
    </section>
  )
}

export default AddElectionModal


