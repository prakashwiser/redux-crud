import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/productsSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">🛒 Products</h3>
        <Button variant="success" onClick={() => navigate("/")}>
          ➕ Add New Product
        </Button>
      </div>

      {/* Loading and Error Handling */}
      {status === "loading" && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {status === "failed" && (
        <Alert variant="danger" className="text-center">
          ❌ Error loading products
        </Alert>
      )}

      <Row className="g-4">
        {[...products].reverse().map((product) => (
          <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card className="shadow-sm border-0 rounded-3">
              <div className="d-flex justify-content-center p-3">
                <img
                  src={`/images/${product.image}`} 
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "180px", objectFit: "cover" }}
                />
              </div>

              <Card.Body className="d-flex flex-column">
                <h5 className="fw-bold text-dark text-center">{product.name}</h5>

                <p className="text-muted text-center">{product.description}</p>

                <h4 className="text-success text-center">₹{product.price}</h4>

                <div className="mt-auto d-flex justify-content-between">
                  <Button
                    variant="warning"
                    size="sm"
                    className="text-white d-flex align-items-center gap-1 w-50"
                    onClick={() => handleUpdate(product.id)}
                  >
                    <PencilSquare /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="d-flex align-items-center gap-1 w-50"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash /> Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
