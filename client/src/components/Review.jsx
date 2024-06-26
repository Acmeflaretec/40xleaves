import React, { useState } from 'react';
import { Button, Card, Col, Form, Modal, ProgressBar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Review.css'; 

function Review() {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 0,
    review: '',
  });
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      review: 'This product is amazing! Highly recommended.',
      date: '2023-04-25',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      review: 'Good product, but could be better in terms of durability.',
      date: '2023-04-20',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      rating: 3,
      review: 'Average product, nothing special.',
      date: '2023-04-15',
    },
    {
      id: 4,
      name: 'Alice Brown',
      rating: 5,
      review: 'Excellent product! Would buy again.',
      date: '2023-04-10',
    },
    {
      id: 5,
      name: 'Chris Evans',
      rating: 2,
      review: 'Disappointing quality, not worth the price.',
      date: '2023-04-05',
    },
    {
      id: 6,
      name: 'Emily White',
      rating: 4,
      review: 'Impressed with the performance.',
      date: '2023-04-01',
    },
  ]);

  const handleOpenReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = () => {
    const newReviewData = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: parseInt(newReview.rating, 10),
      review: newReview.review,
      date: new Date().toISOString().split('T')[0],
    };

    setReviews([...reviews, newReviewData]);
    setNewReview({ name: '', rating: 0, review: '' });
    handleCloseReviewModal();
  };

  const handleReadMore = () => {
    setShowAllReviews(true);
  };

  const totalReviews = reviews.length;
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / totalReviews).toFixed(1);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);

  return (
    <div className="review-section mt-5">
      <h1 className="text-center mb-4 fw-bold">Customer Reviews</h1>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="rating-summary-card">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Ratings & Reviews</Card.Title>
              <Row>
                <Col lg={4} className="text-center">
                  <div className="rating-summary">
                    <h1>{averageRating}</h1>
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${index < Math.floor(averageRating) ? 'text-success' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <small>{totalReviews} ratings</small>
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="rating-bars">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="d-flex align-items-center mb-2">
                        <span className="text-muted me-2 d-flex">
                          <span className="fw-bold">{rating}</span> <i className="fas fa-star" />
                        </span>
                        <div className="progress-container flex-grow-1 mx-2">
                          <ProgressBar
                            now={(ratingCounts[rating - 1] / totalReviews) * 100}
                            variant="success"
                            className="progress-bar-custom"
                          />
                        </div>
                        <span>{((ratingCounts[rating - 1] / totalReviews) * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <div>
                    <h5 className="fw-bold">Review this product</h5>
                    <p className="text-muted">Help others make an informed decision</p>
                  </div>
                  <Button
                    variant="outline-success"
                    className="rounded-pill w-100 p-2 mt-2"
                    onClick={handleOpenReviewModal}
                  >
                    Write a Review
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Reviews from customers</Card.Title>
              {displayedReviews.map((review) => (
                <div key={review.id} className="mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${index < review.rating ? 'text-success' : 'text-muted'}`}
                        />
                      ))}
                    </div>
                    <div>
                      <span className="me-2 fw-bold">{review.name}</span>
                      <small className="me-auto">{review.date}</small>
                    </div>
                  </div>
                  <p>{review.review}</p>
                </div>
              ))}
              {!showAllReviews && (
                <div className="text-center">
                  <Button variant="outline-success" onClick={handleReadMore}>
                    Read More Reviews
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newReview.name}
                onChange={handleReviewChange}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group controlId="formRating" className="mt-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
              >
                <option value={0}>Select rating</option>
                <option value={1}>1 star</option>
                <option value={2}>2 stars</option>
                <option value={3}>3 stars</option>
                <option value={4}>4 stars</option>
                <option value={5}>5 stars</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formReview" className="mt-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                name="review"
                value={newReview.review}
                onChange={handleReviewChange}
                rows={3}
                placeholder="Write your review"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Review;
