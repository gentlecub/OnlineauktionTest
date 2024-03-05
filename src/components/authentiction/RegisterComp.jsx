import { Button, Form, Modal, Alert } from "react-bootstrap";
import React, { useContext, useRef, useState } from "react";
import NewUser from "./NewUser";
import apiRequest from "../apiRequest";
function RegisterComp() {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [newuser, setNewUser] = useState({ email: "", password: "" });
  const emailRef = useRef();
  const passwordRef = useRef();
  const cmfPasswordRef = useRef();

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);
  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    if (passwordRef.current.value !== cmfPasswordRef.current.value) {
      return setError("Passwords does not match");
    } else {
      const newUser = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      };
      console.log("User", newUser);
      const result = await apiRequest("/api/Users", postOptions);
      if (result === null) {
        setError("Successful");
        closeForm();
      } else {
        setError(result);
      }
    }
  };

  return (
    <>
      <div onClick={openForm} className="btn btn-outline-secondary mx-2">
        Register
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={submitForm}>
          <Modal.Header>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required ref={cmfPasswordRef} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
export default RegisterComp;
