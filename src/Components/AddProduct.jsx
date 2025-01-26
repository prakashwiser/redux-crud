import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsSlice";
import { Form, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ name, price }));
    navigate("/products")
    setName("");
    setSalary("");

  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 flex-column">
      <h1 className="text-center mb-4">Product Management</h1>
      <Card className="shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Add Product</Card.Title>
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
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter age"
                required
              />
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
