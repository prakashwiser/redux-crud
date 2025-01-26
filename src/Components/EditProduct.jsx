import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Spinner, Alert } from 'react-bootstrap';
import { updateProduct, fetchProducts } from '../redux/productsSlice';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) =>
    state.products.products.find((item) => item.id === id)
  );

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

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

  const [name, setName] = useState(product.name);
  const [salary, setSalary] = useState(product.salary);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product.id, name, salary }));
    navigate('/products');
  };

  return (
    <Container className="mt-5">
      <Card className="shadow mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Edit Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Developer Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Developer Salary</Form.Label>
              <Form.Control
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
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
