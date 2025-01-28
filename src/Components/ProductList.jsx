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
    <div>
      <div className="d-flex justify-content-center gap-3 my-5 align-items-center">
        <h1 className="text-center">Product List</h1>
        <Button variant="primary" size="sm" onClick={() => navigate("/")}>
          New
        </Button>
      </div>

      {status === "loading" && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {status === "failed" && (
        <Alert variant="danger" className="text-center">
          Error loading products
        </Alert>
      )}

      <Container>
        <Row className="g-3 justify-content-center">
          {[...products].reverse().map((product) => (
            <Col xs={12} md={6} lg={4} key={product.id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center" style={{ textTransform: "capitalize" }}>
                    <span>{product.name}</span>
                    <span className="text-success fw-bold">${product.salary}</span>
                  </Card.Title>
                  <Card.Text className="text-muted">
                    A detailed description or category can go here.
                  </Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2 d-flex align-items-center gap-1 text-white"
                      onClick={() => handleUpdate(product.id)}
                    >
                      <PencilSquare /> Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="d-flex align-items-center gap-1"
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
    </div>
  );
};

export default ProductList;
