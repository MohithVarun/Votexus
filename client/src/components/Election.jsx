import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UiActions } from '../store/ui-slice'
import { voteActions } from '../store/vote-slice'
const Election = ({_id:id,title,description,club}) => {

  const dispatch=useDispatch()
  //open update election modal
  const openModal = () => {
    dispatch(UiActions.openUpdateElectionModal())
    dispatch(voteActions.changeIdOfElectionToUpdate(id))
  }

  
  const isAdmin = useSelector(state => state.vote?.currentVoter?.isAdmin)


    
  return (
    <article className="election">
        <div className="election__image">
            <img src={club} alt={title} />
        </div>
        <div className="election__info">
            <Link to={`/elections/${id}`}><h4>{title}</h4></Link>
            <p>{description?.length >255 ? description.substring(0,255)+"...":description}</p>
            <div className="election__cta">
                <Link to={`/elections/${id}`} className="btn sm">View</Link>
                {isAdmin && <button className="btn sm primary" onClick={openModal}>Edit</button>}
            </div>
        </div>
    </article>
  )
}

export default Election
