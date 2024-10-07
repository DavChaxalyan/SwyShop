import styles from "./Modal.module.css";
import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ProductModal(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={styles.modalContainer}>
                    <div className={styles.imageBlock}>
                        <img src={props?.product?.image} alt="Description" />
                    </div>
                    <div className={styles.containerBlock}>
                        <div className={styles.blockTextPrice}>
                            <p>
                                {props?.product?.category}
                            </p>
                        </div>
                        <div className={styles.priceBlock}>
                            <p>{props?.product?.price}</p>
                            <p>{props?.product?.rating}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default ProductModal;