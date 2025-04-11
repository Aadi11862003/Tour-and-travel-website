import React from "react";
import TourCard from "../../shared/TourCard";
import { Col, Row, Container, Spinner } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const FeaturedTourList = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

  if (loading) {
    return (
      <div className="text-center pt-5">
        <Spinner color="primary" />
        <h4>Loading featured tours...</h4>
      </div>
    );
  }

  if (error) {
    return <h4 className="text-center pt-5 text-danger">{error}</h4>;
  }

  return (
    <Container>
      <Row>
        {!loading &&
          !error &&
          featuredTours?.map((tour) => (
            <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
              <TourCard tour={tour} />
            </Col>
          ))}

        {!loading && !error && (!featuredTours || featuredTours.length === 0) && (
          <Col xs="12">
            <h4 className="text-center">No featured tours available</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default FeaturedTourList;
