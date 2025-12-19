import React from 'react'
import { IoMdClose, IoMdCheckmarkCircle, IoMdAlert, IoMdInformationCircle } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { UiActions } from '../store/ui-slice'

const AlertModal = ({ type = 'info', message }) => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(UiActions.closeAlertModal())
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <IoMdCheckmarkCircle />
      case 'error':
        return <IoMdAlert />
      default:
        return <IoMdInformationCircle />
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Success'
      case 'error':
        return 'Error'
      default:
        return 'Information'
    }
  }

  return (
    <section className="modal">
      <div className="modal__content alert-modal">
        <header className={`modal__header alert-modal__header alert-modal__header--${type}`}>
          <div className="alert-modal__title-wrapper">
            <span className="alert-modal__icon">{getIcon()}</span>
            <h4>{getTitle()}</h4>
          </div>
          <button className="modal__close" onClick={handleClose}>
            <IoMdClose />
          </button>
        </header>
        <div className="alert-modal__body">
          <p>{message}</p>
          <button className="btn primary" onClick={handleClose}>
            OK
          </button>
        </div>
      </div>
    </section>
  )
}

export default AlertModal

