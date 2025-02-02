import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../redux/productsSlice";
import { useNavigate } from "react-router-dom";
import { Button, Card, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const ProductList = () => {
  const Giturl = "https://raw.githubusercontent.com/prakashwiser/redux-crud/refs/heads/main/src/assets/";
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
        <h3 className="text-primary fw-bold">🛒 Products</h3>
        <Button variant="success" className="px-3 fw-semibold" onClick={() => navigate("/addproduct")}>
          ➕ Add New Product
        </Button>
      </div>

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
            <Card className="shadow-lg border-0 rounded-4 overflow-hidden transition-card">
              <div className="d-flex justify-content-center p-3 bg-light">
                <img
                  src={`${Giturl + product.image}`}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ minHeight: "320px" }}
                />
              </div>

              <Card.Body className="d-flex flex-column text-center">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold text-dark text-capitalize">{product.name}</h5>
                  <h4 className="text-success fw-bold">₹{product.price}</h4>

                </div>
                <div className="mt-auto d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    className="text-white fw-semibold flex-grow-1 d-flex align-items-center gap-1"
                    onClick={() => handleUpdate(product.id)}
                  >
                    <PencilSquare /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="fw-semibold flex-grow-1 d-flex align-items-center gap-1"
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

      <style>
        {`
          .transition-card {
            transition: transform 0.3s ease-in-out;
          }
          .transition-card:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    </Container>
  );
};

export default ProductList;
