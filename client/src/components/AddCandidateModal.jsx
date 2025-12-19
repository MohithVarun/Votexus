import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { UiActions } from '../store/ui-slice'
import axios from 'axios'
import AlertModal from './AlertModal'


const AddCandidateModal = () => {
    const [fullName,setFullName]=useState("")
    const [motto,setMotto]=useState("")
    const [image,setImage]=useState("")
    const [isLoading,setIsLoading]=useState(false)

    const dispatch=useDispatch()
    const alertModalShowing = useSelector(state => state.ui.alertModalShowing)
    const alertModalData = useSelector(state => state.ui.alertModalData)


    //close add candidate modal
    const closeModal =()=>{
        dispatch(UiActions.closeAddCandidateModal())
    }
    const token = useSelector(state => state?.vote?.currentVoter?.token)
    const electionId = useSelector(state => state?.vote?.addCandidateElectionId)

    const addCandidate = async (e) =>{
        try {
            e.preventDefault()
            setIsLoading(true)
            const candidateInfo = new FormData()
            candidateInfo.append('fullName',fullName)
            candidateInfo.append('motto',motto)
            candidateInfo.append('image',image)
            candidateInfo.append('currentElection',electionId)
            await axios.post(`${process.env.REACT_APP_API_URL}/candidates`,candidateInfo,{
                withCredentials:true,
                headers:{
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            // Reset form
            setFullName("")
            setMotto("")
            setImage("")
            setIsLoading(false)
            closeModal()
            // Reload page to refresh candidates list
            window.location.reload()
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            dispatch(UiActions.openAlertModal({
                type: 'error',
                message: error.response?.data?.message || "Failed to add candidate. Please try again."
            }))
        }
    }


  return (
    <section className="modal">
        <div className="modal__content">
            <header className="modal__header">
                <h4>Add Candidate</h4>
                <button className="modal__close" onClick={closeModal}><IoMdClose /></button>
            </header>
            <form onSubmit={addCandidate}>
                <div>
                    <h6>Candidate Name:</h6>
                    <input type="text" value={fullName} name='fullName' onChange={(e => setFullName(e.target.value))}/>
                </div>
                <div>
                    <h6>Candidate Motto:</h6>
                    <input type="text" value={motto} name='motto' onChange={(e => setMotto(e.target.value))}/>
                </div>
                <div>
                    <h6>Candidate Image:</h6>
                    <input type="file" name='image' onChange={(e => setImage(e.target.files[0]))} accept="png,jpg,jpeg,webp,avif"/>
                </div>
                <button type="submit" className="btn primary" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className="spinner"></span>
                            Adding...
                        </>
                    ) : (
                        'Add Candidate'
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

export default AddCandidateModal
