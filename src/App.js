import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import {
  validateInputs,
  figureOutErrors,
  formatCreditCard,
  dateCheck,
  cvvCheck,
  findCardType,
} from "./helperFunctions";
import AnimatedCard from "./AnimatedCardPure";
import AnimatedCardWithCreditCard from "./AnimatedCardWithCreditCard";
import CardFormDetails from "./FormContents/CardFormDetails";
import BuyerFormDetails from "./FormContents/BuyerFormDetails";
import "./styles.scss";
import Commerce from "@chec/commerce.js";

const commerce = new Commerce(
  "pk_test_183505c17b9df667acd2e6f925c4957b715322209303f",
  true
);

export default function App() {
  const [validated, setValidated] = useState(false);
  const [validationInfo, setValidationInfo] = useState(null);
  // State for popups
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  // State for different cards

  //*****  Credit Card form *****
  // Raw user input
  const [cardState, setCardState] = useState({});
  // Formatted Values
  const [cardNum, setCardNum] = useState("");
  const [cardName, setName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");

  // ***** State for Buyer Info *****

  const [buyerName, setBuyerName] = useState("");
  const [address, setAddress] = useState("");
  const [cityState, setCityState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // global onChange State handler for credit card entry
  const handleCardChange = (evt) => {
    const value = evt.target.value;
    setCardState({
      ...cardState,
      [evt.target.name]: value,
    });
  };

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

  // take this function away and just use setCardState in submit handler
  function resetState() {
    setCardState("");
  }

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

  //Generates commerce.js checkout token on pageload
  useEffect(() => {
    // take the cartId from the url
    // let cartId = props.match.params.id;
    // commerce.checkout.generateToken(cartId, { type: "cart" })
    commerce.checkout
      // this is an example token, made with a single product permalink. The comment above shows how to use a normal case.
      .generateToken("prod0egY5edW2o3QnA", { type: "permalink" })
      .then((res) => {
        const checkoutTokenId = res.id;
        console.log(res);
      })
      .catch((err) => {
        console.log("something went wrong with the token generation", err);
      });
  }, []);

  // Formats user input and sets individual field states for all forms
  useEffect(() => {
    // each of the following looks for an entry in a field and, if there is one, updates the corresponding hook
    cardState.cardNum
      ? handleFormChange(cardState.cardNum)
      : handleFormChange(" ");
    cardState.expDate
      ? handleDateChange(cardState.expDate)
      : handleDateChange(" ");
    cardState.cvv ? handleCvvChange(cardState.cvv) : handleCvvChange(" ");
    cardState.cardName ? setName(cardState.cardName) : setName(" ");
    cardState.buyerName ? setBuyerName(cardState.buyerName) : setBuyerName(" ");
    cardState.address ? setAddress(cardState.address) : setAddress(" ");
    cardState.cityState ? setCityState(cardState.cityState) : setCityState(" ");
    cardState.zipCode ? setZipCode(cardState.zipCode) : setZipCode(" ");
  }, [cardState]);

  // sets card type when the card Number changes
  useEffect(() => {
    const currentCard = findCardType(cardNum);
    setCardType(currentCard);
  }, [cardNum]);

  return (
    <>
      <Container>
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
        <Row>
          <Col md={true}></Col>
          <Col>
            <AnimatedCardWithCreditCard
              formDetails={CardFormDetails(cardName, cardNum, expDate, cvv)}
              handleChange={handleCardChange}
              handleSubmit={handleSubmit}
              title={"Payment Info"}
              cardNum={cardNum}
              cardName={cardName}
              expDate={expDate}
              cvv={cvv}
              cardType={cardType}
            />
            <AnimatedCard
              formDetails={BuyerFormDetails(
                buyerName,
                address,
                cityState,
                zipCode
              )}
              handleChange={handleCardChange}
              handleSubmit={handleSubmit}
              title={"Billing Info"}
            />
            <Button id="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Col>
          <Col md={true}></Col>
        </Row>
      </Container>
    </>
  );
}
