import { createSlice } from "@reduxjs/toolkit";

const initialState={addCandidateModalShowing: false,voteCandidateModalShowing: false,electionModalShowing:
 false,updateElectionModalShowing:false,confirmationModalShowing: false,confirmationModalData: null,alertModalShowing: false,alertModalData: null}

const uiSlice = createSlice({
    name:"ui",
    initialState,
    reducers: {
        openAddCandidateModal(state){
            state.addCandidateModalShowing =true
        },
        closeAddCandidateModal(state){
            state.addCandidateModalShowing =false
        },
        openVoteCandidateModal(state){
            state.voteCandidateModalShowing =true
        },
        closeVoteCandidateModal(state){
            state.voteCandidateModalShowing =false
        },
        openElectionModal(state){
            state.electionModalShowing =true
        },
        closeElectionModal(state){
            state.electionModalShowing =false
        },
        openUpdateElectionModal(state){
            state.updateElectionModalShowing =true
        },
        closeUpdateElectionModal(state){
            state.updateElectionModalShowing =false
        },
        openConfirmationModal(state, action){
            state.confirmationModalShowing = true
            state.confirmationModalData = action.payload
        },
        closeConfirmationModal(state){
            state.confirmationModalShowing = false
            state.confirmationModalData = null
        },
        openAlertModal(state, action){
            state.alertModalShowing = true
            state.alertModalData = action.payload
        },
        closeAlertModal(state){
            state.alertModalShowing = false
            state.alertModalData = null
        },
    }
})


export const UiActions =uiSlice.actions;

export default uiSlice;