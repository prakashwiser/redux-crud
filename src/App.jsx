import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import { fetchPostsAsync } from './store/postSlice';

const Giturl =
  "https://raw.githubusercontent.com/prakashwiser/Ecommerce-page/refs/heads/main/app/assets/images/";

function App() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPostsAsync());
    }
  }, [dispatch, status]);

  return (
    <Container>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <Row >
          {posts.map((item, index) => (
            <Col md={6} lg={3} key={index} className="mb-3 d-flex justify-content-center">
              <Card
                className="shadow"
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <Card.Img
                  variant="top"
                  src={Giturl + item.image}
                  alt={item.name}
                  className="img-fluid"
                />
                <Card.Body style={{ flexGrow: 1 }}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                    }}
                  >
                    {item.discription || ''}
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  className="border-0 d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: '#fff' }}
                >
                  <small className="text-muted">{item.price}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default App;
