import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { CloudUpload } from "react-bootstrap-icons";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [listingType, setListingType] = useState("Kitchen");
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({ name, price, description, listingType, image: imageName }));
    navigate("/");

    // Reset form fields
    setName("");
    setPrice("");
    setDescription("");
    setListingType("Kitchen");
    setImageName("");
    setImagePreview("");
  };

  return (
    <Container className="mt-5">
      <Card className="p-5 shadow">
        <h2 className="text-center mb-4 text-primary">Add New Product</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={4} className="d-flex flex-column align-items-center ">
              <Form.Group controlId="image" className="mb-3 w-100">
                <Form.Label className="fw-bold">Upload Image</Form.Label>
                <div className="d-flex align-items-center gap-2 border p-2 rounded">
                  <CloudUpload size={24} />
                  <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
                </div>
              </Form.Group>

              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="img-fluid rounded mt-2" style={{ maxWidth: "200px" }} />
              )}
            </Col>
            <Col md={8}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label className="fw-bold">Product Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="price" className="mb-3">
                <Form.Label className="fw-bold">Price</Form.Label>
                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="description" className="mb-3">
                <Form.Label className="fw-bold">Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
              </Form.Group>

              <Form.Group controlId="category" className="mb-3">
                <Form.Label className="fw-bold">Category</Form.Label>
                <Form.Select value={listingType} onChange={(e) => setListingType(e.target.value)} required>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Kids Room">Kids Room</option>
                  <option value="Chair">Chair</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">Add Product</Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
