import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../stores/slices/modalSlice';
import { useAppDispatch, useAppSelector } from '../stores/store';


function ModalContainer() {
    const {body, open} = useAppSelector(state => state.modalReducer)
    const dispatch = useAppDispatch();

    return ( 
        <Modal aria-labelledby="contained-modal-title-vcenter" show={open} onHide={()=> dispatch(closeModal())} animation={false} centered>
            <Modal.Header closeButton />
            <Modal.Body>
                {body}
            </Modal.Body>
        </Modal>
     );
}

export default ModalContainer;