import React, { useState } from "react";
import { Card, Form, Col, Row, Button, Alert } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import {
  validateInputs,
  figureOutErrors,
  formatCreditCard,
  dateCheck,
  cvvCheck,
} from "./helperFunctions";
import Animation from "./Animation";
import "./styles.scss";

export default function App() {
  // Input Values from form
  const [cardNum, setCardNum] = useState(null);
  const [cardName, setName] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [validated, setValidated] = useState(false);
  const [validationInfo, setValidationInfo] = useState(null);
  // Animation Value
  const [hovered, setHovered] = useState(false);
  // State for popups
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  //on form submit, checks for form validity
  const handleSubmit = (event) => {
    // checks for blank fields, etc. in bootstrap form
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    // check the inputs for validity
    if (validateInputs(cardName, cardNum, expDate, cvv)) {
      setValidated(true);
      setShowSuccess(true);
      form.reset();
      resetState();
    } else {
      // ? setValidated(true) && showSuccess(true)
      setValidated(false);
      let fail = figureOutErrors(cardName, cardNum, expDate, cvv);
      setValidationInfo(fail);
      setShowFail(true);
    }
  };

  function resetState() {
    setName(null);
    setCardNum(null);
    setExpDate(null);
    setCvv(null);
  }

  // sets opacity for checkout box when hovered
  const props = useSpring({
    opacity: hovered ? 0.98 : 0.72,
  });

  // Formats card number into readable chunks
  const handleFormChange = (text) => {
    let userCardInput = formatCreditCard(text);
    setCardNum(userCardInput);
  };

  // Formats date input
  const handleDateChange = (text) => {
    let userDateInput = dateCheck(text);
    setExpDate(userDateInput);
  };

  // Formats CVV input
  const handleCvvChange = (text) => {
    let userCvvInput = cvvCheck(text);
    setCvv(userCvvInput);
  };

  return (
    <>
      {/* Main Animation Component */}
      <Animation as={Row} />

      {/* success popup  */}
      {showSuccess ? (
        <Alert
          className="popup"
          variant={"success"}
          onClick={() => setShowSuccess(false)}
          dismissible
        >
          Success! Thanks for your payment.
        </Alert>
      ) : (
        <div></div>
      )}
      {showFail ? (
        <Alert
          className="popup"
          variant={"warning"}
          onClick={() => setShowFail(false) && setValidationInfo(null)}
          dismissible
        >
          There was an error with the {validationInfo} you entered. Please try
          again, and resubmit.
        </Alert>
      ) : (
        <div></div>
      )}

      {/* Form for inputting commerce info */}
      <animated.div
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setHovered(true)}
        style={props}
      >
        <Row>
          <Card as={Col} sm={12} className="class rounded">
            <h1 className="text-center mt-4">Checkout</h1>
            <Form
              onSubmit={handleSubmit}
              className="p-4"
              style={{ opacity: 1 }}
            >
              {/* Name Row */}
              <Form.Row>
                <Form.Group as={Col} controlId="cardName">
                  <Form.Label color="light">Name on Card</Form.Label>
                  <Form.Control
                    required
                    size="sm"
                    type="text"
                    placeholder="Bob Smith"
                    name="cardName"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>
              {/* Card Number Row */}
              <Form.Row>
                <Form.Group as={Col} controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    required
                    value={cardNum}
                    size="sm"
                    type="text"
                    name="cardNumber"
                    placeholder="•••• •••• •••• ••••"
                    onChange={(e) => handleFormChange(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>
              {/* Exp and CVV Row */}
              <Form.Row>
                <Form.Group as={Col} sm="6" controlId="expirationDate">
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    required
                    value={expDate}
                    size="sm"
                    type="text"
                    name="expirationDate"
                    placeholder="01/23"
                    onChange={(e) => handleDateChange(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} sm="6" controlId="cvv">
                  <Form.Label>Security Code</Form.Label>
                  <Form.Control
                    required
                    value={cvv}
                    size="sm"
                    type="text"
                    name="cvv"
                    placeholder="123"
                    onChange={(e) => handleCvvChange(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>
              <Button vairant="secondary" type="submit" className="button mt-3">
                Submit
              </Button>
            </Form>
          </Card>
        </Row>
      </animated.div>
    </>
  );
}
