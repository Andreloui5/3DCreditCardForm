import React, { useState, useEffect } from "react";
import { Container, Row, Alert } from "react-bootstrap";
import {
  validateInputs,
  figureOutErrors,
  formatCreditCard,
  dateCheck,
  cvvCheck,
} from "./helperFunctions";
import Animation from "./Animation";
import AnimatedCard from "./AnimatedCardPure";
import CardFormDetails from "./FormContents/CardFormDetails";
// import BuyerFormDetails from "./FormContents/BuyerFormDetails";
import Amex from "./assets/Cards/Amex.png";
import Default from "./assets/Cards/Default.png";
import Diners from "./assets/Cards/Diners.png";
import Discover from "./assets/Cards/Discover.png";
import Jcb from "./assets/Cards/Jcb.png";
import Visa from "./assets/Cards/Visa.png";
import Mastercard from "./assets/Cards/Mastercard.png";
import "./styles.scss";

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
  const [cardNum, setCardNum] = useState(null);
  const [cardName, setName] = useState(null);
  const [expDate, setExpDate] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [cardType, setCardType] = useState("Default");

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

  function resetState() {
    setName(null);
    setCardNum(null);
    setExpDate(null);
    setCvv(null);
  }

  // Formats card number into readable chunks
  const handleFormChange = (text) => {
    let userCardInput = formatCreditCard(text);
    setCardType(findCardType(userCardInput));
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

  // Formats user input and sets individual field states for credit card form
  useEffect(() => {
    cardState.cardNum
      ? handleFormChange(cardState.cardNum)
      : handleFormChange(" ");
    cardState.expDate
      ? handleDateChange(cardState.expDate)
      : handleDateChange(" ");
    cardState.cvv ? handleCvvChange(cardState.cvv) : handleCvvChange(" ");
    cardState.cardName ? setName(cardState.cardName) : setName();
  }, [cardState]);

  // ***** State for Buyer Info *****
  const [buyerName, setBuyerName] = useState(null);
  const [address, setAddress] = useState(null);
  const [cityState, setCityState] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  function findCardType(number) {
    const firstNumber = number.toString().charAt(0);
    const secondNumber = number.toString().slice(1, 2);
    let cardType;

    switch (firstNumber) {
      case "3":
        !secondNumber
          ? (cardType = Default)
          : secondNumber === "4" || secondNumber === "7"
          ? (cardType = Amex)
          : secondNumber === "5"
          ? (cardType = Jcb)
          : (cardType = Diners);
        break;
      case "4":
        cardType = Visa;
        break;
      case "5":
        cardType = Mastercard;
        break;
      case "6":
        cardType = Discover;
        break;
      default:
        cardType = Default;
        break;
    }
    return cardType;
  }

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
          <AnimatedCard
            formDetails={CardFormDetails(cardName, cardNum, expDate, cvv)}
            handleChange={handleCardChange}
            handleSubmit={handleSubmit}
            title={"Payment Info"}
          />
          {/* Main Animation Component */}
          <Animation
            as={Row}
            cardNum={cardNum}
            cardName={cardName}
            expDate={expDate}
            cvv={cvv}
            cardType={cardType}
          />
          <AnimatedCard
            formDetails={CardFormDetails(cardName, cardNum, expDate, cvv)}
            handleChange={handleCardChange}
            handleSubmit={handleSubmit}
            title={"Payment Info"}
          />
          <AnimatedCard
            formDetails={CardFormDetails(cardName, cardNum, expDate, cvv)}
            handleChange={handleCardChange}
            handleSubmit={handleSubmit}
            title={"Payment Info"}
          />
        </Row>
      </Container>
    </>
  );
}
