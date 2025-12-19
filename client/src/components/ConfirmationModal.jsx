import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { UiActions } from '../store/ui-slice'

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  const dispatch = useDispatch()

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
    dispatch(UiActions.closeConfirmationModal())
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    dispatch(UiActions.closeConfirmationModal())
  }

  return (
    <section className="modal">
      <div className="modal__content confirmation-modal">
        <header className="modal__header">
          <h4>{title}</h4>
          <button className="modal__close" onClick={handleCancel}>
            <IoMdClose />
          </button>
        </header>
        <div className="confirmation-modal__body">
          <p>{message}</p>
          <div className="confirmation-modal__actions">
            <button className="btn" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn danger" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConfirmationModal

