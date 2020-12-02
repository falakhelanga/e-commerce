import React from "react";
import { Alert } from "react-bootstrap";

const Error = ({ children, variant }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Error.defaultProps = {
  variant: "info",
};

export default Error;
