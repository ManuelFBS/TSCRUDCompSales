import {
    Accordion,
    Button,
    Card,
    ListGroup,
} from 'react-bootstrap';

const UserSection = ({
    eventKey,
}: {
    eventKey: string;
}) => {
    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>Empleados</Accordion.Header>
            <Accordion.Body>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item
                            action
                            as={Button}
                            variant="light"
                        >
                            Mostrar Todos
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as={Button}
                            variant="light"
                        >
                            Crear Usuario
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as={Button}
                            variant="light"
                        >
                            Buscar Usuario
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as={Button}
                            variant="light"
                        >
                            Actualizar
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as={Button}
                            variant="light"
                        >
                            Bloquear
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as={Button}
                            variant="light"
                        >
                            Eliminar
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default UserSection;
