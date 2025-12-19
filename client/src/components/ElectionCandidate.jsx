import React from 'react'
import { IoMdTrash } from 'react-icons/io'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UiActions } from '../store/ui-slice'
import AlertModal from './AlertModal'


const ElectionCandidate = ({fullName,image,motto,_id:id,isAdmin}) => {
  const token = useSelector(state => state?.vote?.currentVoter?.token)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleDeleteCandidateClick = () => {
    dispatch(UiActions.openConfirmationModal({
      title: 'Delete Candidate',
      message: `Are you sure you want to delete "${fullName}"? This action cannot be undone.`,
      onConfirm: deleteCandidate
    }))
  }

  const deleteCandidate = async () =>{
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/candidates/${id}`,{withCredentials:true,headers:{Authorization: `Bearer ${token}`}})
      window.location.reload()
    } catch (error) {
      console.log(error)
      dispatch(UiActions.openAlertModal({
        type: 'error',
        message: error.response?.data?.message || "Failed to delete candidate. Please try again."
      }))
    }
  }
  return (
    <li className="electionCandidate">
        <div className="electionCandidate__image">
            <img src={image} alt={fullName} />
        </div>
        <div>
            <h5>{fullName}</h5>
            <small>{motto?.length > 70 ? motto.substring(0,70) + "..." : motto}</small>
            {isAdmin && <button className="electionCandidate__btn" onClick={handleDeleteCandidateClick}><IoMdTrash/></button>}
        </div>
    </li>
  )
}

export default ElectionCandidate
