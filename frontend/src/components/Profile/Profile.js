import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBCardText } from "mdb-react-ui-kit";
import { MdLockReset } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
  Collapse,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import imageProfile from "../../assets/images/profile-empty.png";
import { getUser, putUser } from "../../redux/actions/userActions";
import { changePassword } from "../../redux/actions/authActions";

const Profile = () => {
  const state = useSelector((state) => state.user.ProfileUser);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isResetPassword, setIsResetPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    profileImage: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const orders = [
    { id: 1, date: "2024-01-01", total: "$100.00", status: "Delivered" },
    { id: 2, date: "2024-02-15", total: "$250.00", status: "Processing" },
    { id: 3, date: "2024-02-15", total: "$250.00", status: "Processing" },
  ];

  const handleResetPassword = () => {
    setIsResetPassword((prevState) => !prevState);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordForm((prevState) => !prevState);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleSavePassword = async () => {
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      alert("The new password must be different from the current password.");
      return;
    }

    try {
      const response = await dispatch(
        changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          userId: getUserIdFromToken()
        })
      );
      
      if (response.message === "Password successfully changed") {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate('/login')
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password");
    }
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getUser(getUserIdFromToken(), token));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setFormData({ ...formData, profileImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    if (showEditForm) {
      setFormData({
        username: "",
        profileImage: "",
      });
      setProfileImage("");
    }
    setShowEditForm(!showEditForm);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formDataEdit = new FormData();
    formDataEdit.append("username", formData.username);
    if (formData.profileImage) {
      formDataEdit.append("profileImage", formData.profileImage);
    }
    const token = localStorage.getItem("token");
    try {
      const result = await dispatch(
        putUser(formDataEdit, token, getUserIdFromToken())
      );

      if (result.success) {
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      alert("An error occurred while saving changes");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <img
                src={
                  profileImage
                    ? profileImage
                    : state?.profileImage
                    ? `http://localhost:5000/${state?.profileImage}`
                    : imageProfile
                }
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "150px", height: "150px" }}
              />
              <Card.Title>{state?.username}</Card.Title>
              <Card.Text>{state?.email}</Card.Text>
              <Button
                variant="outline-primary"
                className="mb-3"
                onClick={handleEditToggle}
              >
                {showEditForm ? "Cancel Edit" : "Edit Profile"}
              </Button>

              {/* Edit Form with Collapse */}
              <Collapse in={showEditForm}>
                <div>
                  <Form
                    className="text-start"
                    onSubmit={(e) => handleSaveChanges(e)}
                  >
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProfilePic">
                      <Form.Label>Profile Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="profileImage"
                        onChange={handleImageChange}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Form>

                  <Button
                    variant="warning"
                    onClick={handleResetPassword}
                    className="d-flex align-items-center gap-2 mt-2"
                  >
                    <MdLockReset style={{ fontSize: "20px" }} />
                    Reset Password
                  </Button>
                </div>
              </Collapse>

              {isResetPassword && (
                <Collapse in={showPasswordForm}>
                  <div className="password-reset-block mt-2 text-start">
                    <Form>
                      <MDBCardText className="font-italic mb-1">
                        <label>Current Password:</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="form-control"
                        />
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        <label>New Password:</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="form-control"
                        />
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        <label>Confirm New Password:</label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="form-control"
                        />
                      </MDBCardText>
                      <Button
                        className="mt-2 d-flex align-items-center gap-2"
                        variant="success"
                        onClick={handleSavePassword}
                      >
                        <CiSaveDown2 style={{ fontSize: "20px" }} />
                        Save Password
                      </Button>
                    </Form>
                  </div>
                </Collapse>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {/* Order History */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Order History</Card.Title>
              <ListGroup variant="flush">
                {orders.map((order) => (
                  <ListGroup.Item key={order.id}>
                    <Row>
                      <Col>
                        <strong>Order #:</strong> {order.id}
                      </Col>
                      <Col>
                        <strong>Date:</strong> {order.date}
                      </Col>
                      <Col>
                        <strong>Total:</strong> {order.total}
                      </Col>
                      <Col>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {order.status}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button className="mt-3" variant="primary">
                View All Orders
              </Button>
            </Card.Body>
          </Card>

          {/* Notification Preferences */}
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
                <Button variant="primary" className="mt-3">
                  Save Preferences
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
