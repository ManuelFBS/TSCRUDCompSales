import {
    Accordion,
    Button,
    Card,
    ListGroup,
} from 'react-bootstrap';

const EmployeeSection = ({
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
                            Nuevo Ingreso
                        </ListGroup.Item>
                        <ListGroup.Item
                            action
                            as={Button}
                            variant="light"
                        >
                            Buscar Empleado
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
                            Desincorporar
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default EmployeeSection;
