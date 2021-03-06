import React from "react"
import {Modal, Button, Card, ListGroup, ListGroupItem} from "react-bootstrap"

export default function ModalDetails(props){
    const {showDetails, setShowDetails} = props
    function handleClose() {
        setShowDetails({ show: false });
    }

    return(
        <>
            <Modal
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                show={showDetails.show}
                onHide={handleClose}
                centered
            />
            <Modal show={showDetails.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{"ID: " + showDetails.id + " - " + showDetails.name}</Modal.Title>
                </Modal.Header>
                    <Modal.Body className="mx-auto">
                        <Card style={{ width: '20rem' }}>
                            <Card.Img variant="top" src={showDetails.banner}/>
                            <Card.Body>
                                <Card.Title>{showDetails.name}</Card.Title>
                                <Card.Text>
                                    {showDetails.sinopse}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>{showDetails.genero}</ListGroupItem>
                                <ListGroupItem>{showDetails.categoria}</ListGroupItem>
                            </ListGroup>
                            <Card.Body>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=>handleClose()}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}