import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 123 456 7890",
    address: "123 Main St, City, Country",
    profilePic: "https://via.placeholder.com/150",
  };

  const orders = [
    { id: 1, date: '2024-01-01', total: '$100.00', status: 'Delivered' },
    { id: 2, date: '2024-02-15', total: '$250.00', status: 'Processing' },
    { id: 2, date: '2024-02-15', total: '$250.00', status: 'Processing' },

  ];

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <img
                src={user.profilePic}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.email}</Card.Text>
              <Button variant="outline-primary" className="mb-3">Edit Profile</Button>
            </Card.Body>
          </Card>


        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Order History</Card.Title>
              <ListGroup variant="flush">
                {orders.map(order => (
                  <ListGroup.Item key={order.id}>
                    <Row>
                      <Col><strong>Order #:</strong> {order.id}</Col>
                      <Col><strong>Date:</strong> {order.date}</Col>
                      <Col><strong>Total:</strong> {order.total}</Col>
                      <Col><strong>Status:</strong> <span className={`badge ${order.status === 'Delivered' ? 'bg-success' : 'bg-warning'}`}>{order.status}</span></Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button className="mt-3" variant="primary">View All Orders</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Notification Preferences</Card.Title>
              <Form>
                <Form.Check
                  type="switch"
                  id="email-notifications"
                  label="Email Notifications"
                  defaultChecked
                />
                <Form.Check
                  type="switch"
                  id="sms-notifications"
                  label="SMS Notifications"
                  className="mt-2"
                />
                <Button variant="primary" className="mt-3">Save Preferences</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
