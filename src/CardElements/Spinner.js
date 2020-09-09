import React from "react";
import { Spinner } from "react-bootstrap";

function SubmissionSpinner({ visible }) {
  // The spinner to be shown only after a user clicks "complete order".
  const display = visible ? { zIndex: 100 } : { display: "none" };
  return (
    <Spinner
      animation="border"
      role="status"
      style={display}
      id="submissionSpinner"
    >
      <span className="sr-only">Please wait...</span>
    </Spinner>
  );
}

export default SubmissionSpinner;
