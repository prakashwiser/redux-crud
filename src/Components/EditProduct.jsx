import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Spinner, Alert } from 'react-bootstrap';
import { updateProduct, fetchProducts } from '../redux/productsSlice';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const product = useSelector((state) =>
    state.products.products.find((item) => item.id === id)
  );

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts()).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch, product]);

  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "Kitchen");
  const [imageName, setImageName] = useState(product?.imageName || "");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setImageName(product.imageName);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product.id, name, price, description, category, imageName }));
    navigate('/products');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="d-flex flex-column align-items-center mt-5">
        <Alert variant="danger" className="text-center">
          <h3>Product Not Found</h3>
        </Alert>
        <Button variant="secondary" className="mt-3" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="shadow mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Edit Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="Kitchen">Kitchen</option>
                <option value="Living Room">Living Room</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Kids Room">Kids Room</option>
                <option value="Chair">Chair</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image Name</Form.Label>
              <Form.Control
                type="text"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                required
                disabled
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Update Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProduct;
