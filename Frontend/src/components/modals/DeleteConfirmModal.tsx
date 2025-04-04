import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteConfirmModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    isLoading: boolean;
    title: string;
    message: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    show,
    onHide,
    onConfirm,
    isLoading,
    title,
    message,
}) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
                <Button
                    variant="danger"
                    onClick={onConfirm}
                    disabled={isLoading}
                >
                    {isLoading ? 'Eliminando...' : 'Eliminar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmModal;
