import React from "react";
import { Spinner } from "react-bootstrap";

function SubmissionSpinner({ visible }) {
  const display = visible ? { zIndex: 100 } : { display: "none" };
  return (
    <Spinner
      animation="border"
      role="status"
      style={display}
      id="submissionSpinner"
    >
      <span className="sr-only">Submitting your order...</span>
    </Spinner>
  );
}

export default SubmissionSpinner;
