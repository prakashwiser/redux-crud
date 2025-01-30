import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsSlice";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ name, roll }));
    navigate("/products")
    setName("");
    setRoll("");

  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
      <h3 className="text-center mb-4">Developer Roll</h3>
      <Card className="shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Add Details</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="productName" className="mb-3">
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter  name"
                required
              />
            </Form.Group>
            <Form.Group controlId="productPrice" className="mb-4">
              <Form.Label>Job Role</Form.Label>
              <Form.Select
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                required
              >
                <option value="">Select Job Role</option>
                <option value="Front-end Developer">Front-end Developer</option>
                <option value="Back-end Developer">Back-end Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="MERN Developer">MERN Developer</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Add Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
