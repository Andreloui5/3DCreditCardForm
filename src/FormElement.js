import React from "react";
import { Form, Col } from "react-bootstrap";

function FormElement(props) {
  return (
    <Form.Group as={Col} sm={props.smallColSize} controlId={props.controlId}>
      <Form.Label color="light">{props.formLabel}</Form.Label>
      <Form.Control
        required
        size={"sm"}
        type={"text"}
        value={props.value}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.handleChange}
      />
    </Form.Group>
  );
}

export default FormElement;
