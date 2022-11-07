import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import toRupiah from '@develoka/angka-rupiah-js';


function MenuModal(props) {
    const handleConfirm = () => {
        props.setConfirm(true)
    }
    const handleConfirm2 = () => {
        props.setConfirm(false)
    }
    return (
        <div>

            <Modal show={props.showModal} onHide={props.hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {props.modal ?
                    <Card className='me-3 mt-3 p-2' style={{ width: '100%' }}>
                        <Card.Img variant="top" src={props.modal.image} />
                        <Card.Body>
                            <Card.Title >{props.modal.name} </Card.Title>
                            <Card.Text >
                                {toRupiah(props.modal.price, {floatingPoint: 0 })}
                            </Card.Text>
                        </Card.Body>
                        </Card> : null }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {handleConfirm2(); props.hideModal()}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {handleConfirm(); props.hideModal()}}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MenuModal