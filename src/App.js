import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import {
  validateInputs,
  figureOutErrors,
  formatCreditCard,
  dateCheck,
  cvvCheck,
  findCardType,
} from "./helperFunctions";
import FormCard from "./FormCard";
import FormCardWithAnimation from "./FormCardWithAnimation";
import CartCard from "./CartCard";
import Spinner from "./Spinner";
import CardFormDetails from "./FormContents/CardFormDetails";
import BuyerFormDetails from "./FormContents/BuyerFormDetails";
import Commerce from "@chec/commerce.js";
import CustomButton from "./CustomButton";
import "./styles.scss";

const commerce = new Commerce(
  "pk_test_183505c17b9df667acd2e6f925c4957b715322209303f",
  true
);

export default function App() {
  const [validationInfo, setValidationInfo] = useState(null);
  // State for popups
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  // State for checkout token
  const [checkoutToken, setCheckoutToken] = useState("");
  // Line Items in the current checkout Token
  const [lineItems, setLineItems] = useState("");
  // Cart items to show at top of page
  const [currentCart, setCurrentCart] = useState();
  // Submission spinner toggle
  const [spinnerVisible, setSpinnerVisible] = useState(false);

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

  const [buyerFirstName, setBuyerFirstName] = useState("");
  const [buyerLastName, setBuyerLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [geoState, setGeoState] = useState("");
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
      // enables spinner while the call to Commerce completes
      setSpinnerVisible(true);
      // sends checkout to Commerce
      executeCheckout(checkoutToken);
    } else {
      // If something is wrong in form, figure out which field was improperly filled
      let fail = figureOutErrors(cardName, cardNum, expDate, cvv);
      // scroll to top of page
      window.scrollTo(0, 0);
      // sets the appropriate variable for the error message display
      setValidationInfo(fail);
      // shows error message to user
      setShowFail(true);
    }
  };

  useEffect(() => {
    //whenever checkoutToken is updated, finds current line items and formats them for the checkout object
    if (checkoutToken.line_items !== undefined) {
      let itemsInCart = {};
      checkoutToken.line_items.forEach((item) => {
        itemsInCart = {
          ...itemsInCart,
          [item.id]: {
            quantity: 1,
          },
        };
      });
      setLineItems(itemsInCart);
    }
  }, [checkoutToken]);

  function executeCheckout(checkoutToken) {
    commerce.checkout
      .capture(checkoutToken.id, {
        line_items: lineItems,
        conditionals: {
          collects_billing_address: true,
        },
        customer: {
          firstname: buyerFirstName,
          lastname: buyerLastName,
          email: email,
        },
        shipping: {
          name: `${buyerFirstName} ${buyerLastName}`,
          street: address,
          town_city: city,
          county_state: geoState,
          postal_zip_code: zipCode,
          country: "US",
        },
        fulfillment: {
          // The shipping method ID for "USPS Ground" (for example)
          // You can use commerce.checkout.getShippingOptions() to get a list
          shipping_method: "ship_1ypbroE658n4ea",
        },
        payment: {
          // Test Gateway is enabled by default, and is used when you submit orders with
          // your sandbox API key
          gateway: "test_gateway",
          card: {
            number: cardNum,
            expiry_month: expDate.substring(0, 2),
            expiry_year: expDate.substring(3, 5),
            cvc: cvv,
            postal_zip_code: zipCode,
          },
        },
      })
      .then((response) => {
        // triggers success popup message
        setShowSuccess(true);
        // resets card state (which empties all entry fields)
        setCardState("");
        // empties the user's 'current cart' at top of page
        setCurrentCart("");
        // cancels spinner triggered by clicking the "complete order" button.
        setSpinnerVisible(false);
        // return to top of page
        window.scrollTo(0, 0);
        // You could save responseId to hook here and then pass that via url to response page
        console.log(
          "Great, your checkout was captured successfully! Checkout the response object for receipt info.",
          response
        );
      })
      .catch((error) => {
        // sets the variable in the failure user message
        setValidationInfo("submission");
        // cancels spinner triggered by clicking the "complete order" button.
        setSpinnerVisible(false);
        // shows error message to user
        setShowFail(true);
        // scrolls to top of page
        window.scrollTo(0, 0);
        console.log(error);
      });
  }

  // Formats card number into readable chunks
  const handleFormChange = (text) => {
    let userCardInput = formatCreditCard(text);
    //sets state with formatted input
    setCardNum(userCardInput);
  };

  // Formats date input
  const handleDateChange = (text) => {
    let userDateInput = dateCheck(text);
    //sets state with formatted input
    setExpDate(userDateInput);
  };

  // Formats CVV input
  const handleCvvChange = (text) => {
    let userCvvInput = cvvCheck(text);
    //sets state with formatted input
    setCvv(userCvvInput);
  };

  //Generates commerce.js checkout token on pageload
  useEffect(() => {
    // In most cases, you should pass the cartId through the url from cart page
    // let cartId = props.match.params.id;
    // commerce.checkout.generateToken(cartId, { type: "cart" })
    commerce.checkout
      // this is an example token, made with a single product permalink. The comment above shows how to use a normal case.
      .generateToken("prodRqEv5xOVPoZz4j", { type: "permalink" })
      .then((res) => {
        setCheckoutToken(res);
        setCurrentCart(res);
      })
      .catch((err) => {
        console.log("Something went wrong with the token generation", err);
      });
  }, []);

  // Formats user input and sets individual field states for all forms
  useEffect(() => {
    // each of the following looks for an entry in a field and, if there is one, updates the corresponding hook
    cardState.cardNum
      ? handleFormChange(cardState.cardNum)
      : handleFormChange("");
    cardState.expDate
      ? handleDateChange(cardState.expDate)
      : handleDateChange("");
    cardState.cvv ? handleCvvChange(cardState.cvv) : handleCvvChange("");
    cardState.cardName ? setName(cardState.cardName) : setName("");
    cardState.buyerFirstName
      ? setBuyerFirstName(cardState.buyerFirstName)
      : setBuyerFirstName("");
    cardState.buyerLastName
      ? setBuyerLastName(cardState.buyerLastName)
      : setBuyerLastName("");
    cardState.email ? setEmail(cardState.email) : setEmail("");
    cardState.address ? setAddress(cardState.address) : setAddress("");
    cardState.city ? setCity(cardState.city) : setCity("");
    cardState.geoState ? setGeoState(cardState.geoState) : setGeoState("");
    cardState.zipCode ? setZipCode(cardState.zipCode) : setZipCode("");
  }, [cardState]);

  // sets card type when the card Number changes. This is used to change the animation backgound img
  useEffect(() => {
    const currentCard = findCardType(cardNum);
    setCardType(currentCard);
  }, [cardNum]);

  return (
    <>
      <Container>
        <Spinner visible={spinnerVisible} />
        {/* success popup  */}
        {showSuccess ? (
          <Alert
            className="popup"
            variant={"success"}
            onClick={() => setShowSuccess(false)}
            dismissible
          >
            Success! Your order has been received. Thanks for shopping with us!
          </Alert>
        ) : (
          <div></div>
        )}
        {/* error popup */}
        {showFail ? (
          <Alert
            className="popup"
            variant={"warning"}
            onClick={() => setShowFail(false) && setValidationInfo(null)}
            dismissible
          >
            There was a problem with your {validationInfo}. Please ensure your
            information was entered correctly and try again.
          </Alert>
        ) : (
          <div></div>
        )}

        {/* Form for inputting commerce info */}
        <Row>
          <Col md={true}></Col>
          <Col>
            <CartCard currentCart={currentCart} />
            <FormCard
              formDetails={BuyerFormDetails(
                buyerFirstName,
                buyerLastName,
                email,
                address,
                city,
                geoState,
                zipCode
              )}
              handleChange={handleCardChange}
              handleSubmit={handleSubmit}
              title={"Customer Details"}
            />
            <FormCardWithAnimation
              formDetails={CardFormDetails(cardNum, cardName, expDate, cvv)}
              handleChange={handleCardChange}
              handleSubmit={handleSubmit}
              title={"Payment"}
              cardNum={cardNum}
              cardName={cardName}
              expDate={expDate}
              cvv={cvv}
              cardType={cardType}
            />
            <CustomButton onSubmit={handleSubmit} text={"Complete Order"} />
          </Col>
          <Col md={true}></Col>
        </Row>
      </Container>
    </>
  );
}
