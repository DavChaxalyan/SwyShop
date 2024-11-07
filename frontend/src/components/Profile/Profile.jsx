import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBCardText } from "mdb-react-ui-kit";
import { MdLockReset } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import { GrHistory } from "react-icons/gr";
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
import { formatCurrency, getUserIdFromToken, priceFix } from "../../Utils/utils";
import { getOrders } from "../../redux/actions/orderActions";
import "./Profile.css";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const { t } = useTranslation();
  const { orders } = useSelector((state) => state.order);
  const { currency, exchangeRates } = useSelector((state) => state.currency);
  const userOrders = orders?.filter(
    (order) => order.customerId === getUserIdFromToken()
  );
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

  const handleMyProduct = () => {
    navigate("/my-products");
  };

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
      alert(t("profile-page-new-password-and-confirm"));
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      alert(t("profile-page-new-password-and-different"));
      return;
    }

    try {
      const response = await dispatch(
        changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          userId: getUserIdFromToken(),
        })
      );

      if (response.message === "Password successfully changed") {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert(t("profile-page-failed-to-change"));
    }
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Container className="mt-4 mb-4 main-profile-block">
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
                {showEditForm ? t("profile-page-edit-cancel-button") : t("profile-page-edit-button")}
              </Button>

              {/* Edit Form with Collapse */}
              <Collapse in={showEditForm}>
                <div>
                  <Form
                    className="text-start"
                    onSubmit={(e) => handleSaveChanges(e)}
                  >
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>{t("profile-page-edit-lb1")}</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formProfilePic">
                      <Form.Label>{t("profile-page-edit-lb2")}</Form.Label>
                      <Form.Control
                        type="file"
                        name="profileImage"
                        onChange={handleImageChange}
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    {t("profile-page-edit-button-save")}
                    </Button>
                  </Form>

                  <Button
                    variant="warning"
                    onClick={handleResetPassword}
                    className="d-flex align-items-center gap-2 mt-2"
                  >
                    <MdLockReset style={{ fontSize: "20px" }} />
                    {t("profile-page-edit-button-reset-password")}
                  </Button>
                </div>
              </Collapse>

              {isResetPassword && (
                <Collapse in={showPasswordForm}>
                  <div className="password-reset-block mt-2 text-start">
                    <Form>
                      <MDBCardText className="font-italic mb-1">
                        <label>{t("profile-page-reset-password-lb1")}:</label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="form-control"
                        />
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        <label>{t("profile-page-reset-password-lb2")}:</label>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="form-control"
                        />
                      </MDBCardText>
                      <MDBCardText className="font-italic mb-1">
                        <label>{t("profile-page-reset-password-lb3")}:</label>
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
                        {t("profile-page-reset-password-button-save-password")}
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
              <Card.Title style={{fontSize: "30px", fontWeight: "700", color: "#3e7ad3"}}>{t("profile-page-order-history-title")} <GrHistory style={{fontSize: "25px", color: "#3e7ad3"}}/></Card.Title>
              <ListGroup variant="flush" className={userOrders.length > 0 ? "order-history" : ""}>
                {userOrders.length > 0 ? (
                  userOrders.map((order, ind) => (
                    <ListGroup.Item key={order._id}>
                      <Row>
                        <Col>
                          <strong>{t("profile-page-order-history-order")} #:</strong> {ind + 1}
                        </Col>
                        <Col>
                          <strong>{t("profile-page-order-history-date")}:</strong> {formatDate(order.createdAt)}
                        </Col>
                        <Col>
                          <strong>{t("profile-page-order-history-total")}:</strong> {formatCurrency(priceFix(currency, order.totalAmount, exchangeRates), currency)}
                        </Col>
                        <Col>
                          <strong>{t("profile-page-order-history-status")}:</strong>{" "}
                          <span
                            className={`badge ${
                              order.status === "Received"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {order.status}
                          </span>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))
                ) : (
                  <div className="no-orders">
                    <h3>{t("profile-page-order-history-not-have")}.</h3>
                    <p>{t("profile-page-order-history-start-shopping")}!</p>
                    <button className="shop-now-button" onClick={() => navigate("/products")}>{t("profile-page-order-history-start-button")}</button>
                  </div>
                )}
              </ListGroup>
              <Button
                className="mt-3"
                variant="primary"
                onClick={() => navigate("/orders")}
                disabled={!userOrders.length}
              >
                {t("profile-page-order-history-view-button")}
              </Button>
            </Card.Body>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <Card.Body>
              <Card.Title>{t("profile-page-my-products")}</Card.Title>
              <Button
                variant="primary"
                className="mt-3"
                onClick={handleMyProduct}
              >
                {t("profile-page-my-products-button")}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
