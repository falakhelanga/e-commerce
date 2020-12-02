import React from "react";
import { Spinner, Container } from "react-bootstrap";

function Spiner() {
  return (
    <div>
      <Container className="text-center">
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
          }}
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    </div>
  );
}

export default Spiner;
