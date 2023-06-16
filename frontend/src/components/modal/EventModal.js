import React from "react";
import Modal from "react-bootstrap/Modal";
import '../../index.css'; 


const EventModal = (props) => {

    return (
        <>
            <Modal show={props.isOpen} onHide={props.onHide}>
                <Modal.Header className="bg-event-purple">
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    {props.canCancel && 
                        <button className="btn btn-secondary" onClick={props.onCancel}>Cancel</button>}
                    {props.canConfirm && 
                        <button className="btn btn-event-purple" onClick={props.onConfirm}>{props.confirmText}</button>}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventModal;
