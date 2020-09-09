# Create a Checkout with React and Three.js

This guide shows you how to set up a checkout experience using Commerce.js, React, Three.js, and React-Three-Fiber.

This guide uses the [Commerce.js](https://commercejs.com/) SDK (v2) and is a continuation of a previous guide— [Create a Cart with React and Three.js](https://github.com/Andreloui5/CommerceWithThree-part2).

[View the live demo](https://2wx95.csb.app/)

![Checkout example](public/assets/Checkout.gif)

## Overview

Through this project, you will:

 * See how Commerce.js enables highly customized eCommerce sites
 * Use Commerce.js and [Three.js](https://threejs.org/) to build a scalable checkout experience with 3D elements

### Requirements
As with the last guide, you will need:

- A code editor/IDE of your choice
- A [Chec](https://authorize.chec.io/signup) account
- Node.js
- npm/yarn

### Prerequisites

It will help if you have some working knowledge of:
- JavaScript
- React
- Bootstrap


### Installation

In addition to the technologies used in the previous guide, you will need to use `"card-validator"`, which you can install with npm.
```bash
npm i card-validator
```
### Project usage

**1. Uploading Products**

If you have completed the previous guide, feel free to skip this section. If you have not, start by creating a [Chec](https://authorize.chec.io/signup) account. Once you have logged in, navigate to **Products**.

Add a product titled "Vans Shoe" and leave the variants section empty.

Click **Save Changes** at the bottom of the page and open your code editor.

(For the sake of this guide, you will create a checkout with this single product. It is important to note that `Commerce` is immensely customizable, and it is easy to add products and variants to any store. If you would like to see how you can handle multiple products with variants, check out [this guide](https://github.com/kingmoc/adding-products-cart-cjs-react/blob/master/README.md).)


**2. Setting up your file structure**

This guide details a stand-alone checkout application. It is fairly straightforward to integrate it with the previous guides by using `react-router`. If you would like assistance setting up your routes, [Kingmoc's guide](https://github.com/kingmoc/adding-products-cart-cjs-react/blob/master/README.md) covers routing in detail.

For this guide, you will need the following files and folders in your `src` folder.
```

|--animation
|  |--Animation.js
|  |--Card.js
|  |--CardText.js
|  |--Controls.js
|  |--BackDrop.js
|  |--Scene.js
|  |--Skybox.js
|--assets
|--cardElements
|  |--CartCard.js
|  |--FormCard.js
|  |--FormCardWithAnimation.js
|  |--FormElement.js
|  |--Spinner.js
|--formContents
--App.js
--helperFunctions.js
--index.js


```
**3. Adding CSS**

Since this guide is not focused on styling, replace the content in your styles.css folder with the following code:

<details>
<summary>Click to show style.css</summary>

```css
/* style.css */
html,
body,
#root,
canvas {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

* {
box-sizing: border-box;
}

body{
  // background: white;
  background-color: #2D3047;
  background-image: linear-gradient(147deg, #2D3047 0%, #eae6e5 74%);
  background-attachment: fixed;
  overflow: scroll;
}

.infoCard {
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  will-change: transform;
}

.card{
  margin: 30px;
  padding: 15px;
  max-width: 500px;
  max-height: 1000px;
  z-index: 10;
  background-color: #413D44;
  overflow: hidden;
}

.form-control::-webkit-input-placeholder {
  opacity: .4;
}
.form-label {
  color: #eae6e5;
}

.button {
  float: right
}

.popup{
  position: fixed;
  top: 0;
  left: 0;
  margin: 15px;
  z-index: 100;
}

h1{
  text-align: center;
  color: white
}

.myCard {
  border-radius: 15px;
}

.cardAnimation{
  max-width: 500px;
  max-height: 300px;
  z-index: 10;
  background: #413D44;
  box-shadow: inset -20px 20px 60px #37343a,
            inset 20px -20px 60px #4b464e;
}

#submit {
  margin: 10px 15px 15px 15px;
  padding: 15px;
  z-index: 10;
  font-size: 18px;
}

p{
  color: white;
  font-size: 15px;
}

h4{
  color: white;
  font-size: 18px;
  float: right;
}

@media only screen and (min-width: 1000px) {
  #cart {
    position: fixed;
    top: 0;
    right: 0;
  }
  h4 {
    text-align: center;
  }
}

#submissionSpinner {
  position: fixed;
  top: 50%;
  left: 50%;
}
```
</details>

**4. `useState()` Hooks for your Checkout**

Navigate to `App.js`. Since a checkout requires handling quite a bit of information, a good deal of this file will be dedicated to logic. In the previous guides, you used React's `useEffect()` hook to fetch data from `commerce` and the `useState()` hook to manage the state of `products`. This guide will continue to use hooks to manage state. Import `useEffect` and `useState` from "react" and then declare the following:

  - State for your `checkoutToken` from `Commerce`
  ```js
  //App.js

  // The checkout token itself
  const [checkoutToken, setCheckoutToken] = useState("");
  // Line Items in the current checkout Token
  const [lineItems, setLineItems] = useState("");
  ```
  - State for user inputs
  ```js
  // Raw user input for Credit Card Info
  const [cardState, setCardState] = useState({});

  // Formatted Values for Credit Card Info
  const [cardNum, setCardNum] = useState("");
  const [cardName, setName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");

  //State for Buyer Info
  const [buyerFirstName, setBuyerFirstName] = useState("");
  const [buyerLastName, setBuyerLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [geoState, setGeoState] = useState("");
  const [zipCode, setZipCode] = useState("");
  ```
  - You will also want to have a few hooks to handle user validations
  ```js
  const [validationInfo, setValidationInfo] = useState(null);
  // State for popups
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  // Cart items to show at top of page
  const [currentCart, setCurrentCart] = useState();
  // Submission spinner toggle
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  ```

**5. Handling user inputs**

In order to make your components reusable (and able to handle any user input you might desire), set up a generic state handler.

```js
 //App.js

const handleCardChange = (evt) => {
    const value = evt.target.value;
    setCardState({
      ...cardState,
      [evt.target.name]: value,
    });
  };
```
This handler takes advantage of the cardState hook to make a new key/value pair for any new input and also updates the value for any previously created pairing.

Now make a few functions that will allow you to format and validate user inputs (you will create the helper functions a little further along in this guide).
```js
 //App.js

  const handleFormChange = (text) => {
    let userCardInput = formatCreditCard(text);
    //sets card number hook with formatted/validated input
    setCardNum(userCardInput);
  };

  const handleDateChange = (text) => {
    let userDateInput = dateCheck(text);
    //sets expiration date hook with formatted/validated input
    setExpDate(userDateInput);
  };

  const handleCvvChange = (text) => {
    let userCvvInput = cvvCheck(text);
    //sets cvv hook with formatted/validated input
    setCvv(userCvvInput);
  };
```

The last handler you will need to make is a submission handler. Upon submission, this function will check for valid inputs, execute the checkout, and return success or error messages.

```js
 //App.js

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
```

**5. `useEffect()` hooks for your Checkout**

In order to handle all of the data needed for a checkout, you will be using several `useEffect()` hooks to keep track of the different lifecycle events this page will experience.

To initialize a checkout, you will need to make a call to `Commerce` and generate a checkout token. To do this, import `Commerce` and create a variable with your sandbox public key. Put it directly under the import section of `App.js`. (If needed, you can find your key in the [Developer section](https://dashboard.chec.io/setup/developer) of Chec Dashboard's 'Setup' tab).

```js
//App.js
import Commerce from "@chec/commerce.js";

const commerce = new Commerce(
  "YOUR SANDBOX KEY GOES HERE"
);
```

Now take advantage of `useEffect()` to generate a checkout token on page load. For the sake of simplicity, this tutorial is using a permalink that references a single product. If needed, you can find the permalink to your product in the `Options` section of Chec's [Product Dashboard](https://dashboard.chec.io/).
```js
 //App.js

  useEffect(() => {
    commerce.checkout
      .generateToken("YOUR PRODUCT PERMALINK GOES HERE", { type: "permalink" })
      .then((res) => {
        setCheckoutToken(res);
        setCurrentCart(res);
      })
      .catch((err) => {
        console.log("Something went wrong with the token generation", err);
      });
  }, []);
```

In most real-world cases, you will probably want to reference a user's previously created cart instead of one that is hard-coded. You can easily pass the needed cart ID via the url when you route to this page. To do so, just change the code for `generateToken()` to look something like this:
```js
let cartId = props.match.params.id;
commerce.checkout.generateToken(cartId, { type: "cart" })
```

It is also worth noting that, if needed, you can retrieve a previously generated token from `Commerce` in much the same manner as generating a new one. You would simply exchange the `generateToken()` method with `getToken()`.

Now create a function that will handle the checkout once the user clicks the `Complete Order` button. Again, this guide presents a streamlined checkout experience. `Commerce` has many additional options available that are not reflected in the basic checkout below. To see an example of all the options available during a checkout experience, see [Chec's documentation](https://commercejs.com/docs/api/#generate-token).

```js
 //App.js

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

```

Now that you have created a function to handle the checkout, set up a hook that will capture the line items in a user's cart when a checkout token is generated and format them for use in the `executeCheckout()` function you just created.

```js
 //App.js

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
```

A cart is not all that you will need for a checkout, however. You also need to handle user inputs. To do this, set up a `useEffect` hook that watches for changes in `cardState`. This handles user inputs (and make them more readible and accessible later). You can also use ternary operators to separate user inputs into individual hooks if they are truthy.

```js
 //App.js

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
```

Now, in order for your animation to change when the user types in different credit card numbers, you need to create a listener for the `cardNum` hook.
```js
 //App.js

  // sets card type when the card Number changes. This is used to change the animation backgound img
  useEffect(() => {
    const currentCard = findCardType(cardNum);
    setCardType(currentCard);
  }, [cardNum]);
```

At this point, App.js should look something like this:

<details>
<summary>Click to see `App.js` at this juncture</summary>

```js
//App.js
import React, { useState, useEffect } from "react";
import "./styles.scss";

const commerce = new Commerce(
  "pk_test_183505c17b9df667acd2e6f925c4957b715322209303f",
  true
);

export default function App() {
  const [validationInfo, setValidationInfo] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  const [checkoutToken, setCheckoutToken] = useState("");
  const [lineItems, setLineItems] = useState("");
  const [currentCart, setCurrentCart] = useState();
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [cardState, setCardState] = useState({});
  const [cardNum, setCardNum] = useState("");
  const [cardName, setName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [buyerFirstName, setBuyerFirstName] = useState("");
  const [buyerLastName, setBuyerLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [geoState, setGeoState] = useState("");
  const [zipCode, setZipCode] = useState("");


  const handleCardChange = (evt) => {
    const value = evt.target.value;
    setCardState({
      ...cardState,
      [evt.target.name]: value,
    });
  };


  const handleFormChange = (text) => {
    let userCardInput = formatCreditCard(text);
    setCardNum(userCardInput);
  };

  const handleDateChange = (text) => {
    let userDateInput = dateCheck(text);
    setExpDate(userDateInput);
  };

  const handleCvvChange = (text) => {
    let userCvvInput = cvvCheck(text);
    setCvv(userCvvInput);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    if (validateInputs(cardName, cardNum, expDate, cvv)) {
      setSpinnerVisible(true);
      executeCheckout(checkoutToken);
    } else {
      let fail = figureOutErrors(cardName, cardNum, expDate, cvv);
      window.scrollTo(0, 0);
      setValidationInfo(fail);
      setShowFail(true);
    }
  };

  useEffect(() => {
    commerce.checkout
      .generateToken("prodRqEv5xOVPoZz4j", { type: "permalink" })
      .then((res) => {
        setCheckoutToken(res);
        setCurrentCart(res);
      })
      .catch((err) => {
        console.log("Something went wrong with the token generation", err);
      });
  }, []);

  useEffect(() => {
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
          shipping_method: "ship_1ypbroE658n4ea",
        },
        payment: {
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
        setShowSuccess(true);
        setCardState("");
        setCurrentCart("");
        setSpinnerVisible(false);
        window.scrollTo(0, 0);
        console.log(
          "Great, your checkout was captured successfully! Checkout the response object for receipt info.",
          response
        );
      })
      .catch((error) => {
        setValidationInfo("submission");
        setSpinnerVisible(false);
        setShowFail(true);
        window.scrollTo(0, 0);
        console.log(error);
      });
  }

  useEffect(() => {
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

  useEffect(() => {
    const currentCard = findCardType(cardNum);
    setCardType(currentCard);
  }, [cardNum]);

  return (
    <></>
  );
}

```
</details>


**6. Writing Helper Functions**

Before adding more to `App.js`, turn your attention to `helperFunctions.js`. Here, create some exported functions that will validate a user's inputs.

First, you should create a function that checks if a user's card number, cvv, and expiration date are valid.

```js
//helperFunctions.js

import valid from "card-validator";
export function validateInputs(name, number, date, cvv) {
  // check for a (potentially) valid credit card number
  const numberValidation = valid.number(number).isValid;
  const nameValidation = typeof name === "string" ? true : false;
  const expValidation = valid.expirationDate(date).isValid;
  const cvvValidation = valid.cvv(cvv).isValid;

  // if all are valid, return true1
  if (numberValidation && nameValidation && expValidation && cvvValidation) {
    return true;
  } else {
    return false;
  }
}
```

Then make a function that will return a string, indicating which input was invalid. (You will later integrate this with an alert which uses the returned value in a template literal, and displays it to the user).
```js
//helperFunctions.js

export function figureOutErrors(name, number, date, cvv) {
  if (typeof name !== "string") {
    return "name";
  }
  if (valid.number(number).isValid !== true) {
    return "card number";
  }
  if (valid.expirationDate(date).isValid !== true) {
    return "expiration date";
  }
  if (valid.cvv(cvv).isValid !== true) {
    return "security code";
  }
}
```

It is also important to control user inputs for security reasons. You can use regex to control what characters a user is allowed to type in a given field. The following functions limit which characters a user is allowed to use andformat their inputs properly (so that they look standard on the page).

```js
//helperFunctions.js

// sanitizes card input
function cleanInput(value) {
  return value.replace(/\D+/g, "");
}

// formats credit card based on type
export function formatCreditCard(value) {
  // brings in cleaned value inputted
  const cleanValue = cleanInput(value);
  // find first number of card (since cards have unique first numbers, this tells the type of card used.)
  const firstNumber = cleanValue.charAt(0);
  let currentValue;

  switch (firstNumber) {
    // 3 is for american express (which has differnt formatting than other cards)
    case "3":
      currentValue = `${cleanValue.slice(0, 4)} ${cleanValue.slice(
        4,
        10
      )} ${cleanValue.slice(10, 15)}`;
      break;
    // sets up formatting for normal cards (into groups of 4 numbers)
    default:
      currentValue = `${cleanValue.slice(0, 4)} ${cleanValue.slice(
        4,
        8
      )} ${cleanValue.slice(8, 12)} ${cleanValue.slice(12, 16)}`;
      break;
  }
  return currentValue.trim();
}

// formats mm/yy date
export function dateCheck(text) {
  let cleanText = text.replace(/\D/g, "").replace(/\W/gi, "");
  let all = cleanText.split("");
  if (all.length <= 2) {
    let joined = all.join("");
    return joined;
  } else {
    all.splice(2, 0, "/");
    let sliced = all.length > 5 ? all.slice(0, 5) : all;
    let formatted = sliced.join("");
    return formatted;
  }
}

// formats CVV
export function cvvCheck(text) {
  let cleanText = text.replace(/\D/g, "").replace(/\W/gi, "");
  let all = cleanText.split("");
  let sliced = all.length > 4 ? all.slice(0, 4) : all;
  let formatted = sliced.join("");

  return formatted;
}
```

**7. Creating a Reusable Card**

Since there are many different pieces of information you may wish to collect during a checkout process, it is good to create a reusable component to collect that data. In this case, navigate to `FormElement.js`. This reusable component takes in information via props and returns a single text input field.

```js
//FormElement.js

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
```
Now move to `FormCard.js`. Here, make a component that will create a bootstrapped card with multiple input fields (created with the `FormElement` component).

```js
//FormCard.js

import React, { useState } from "react";
import { Row, Form, Card, Col } from "react-bootstrap";
import FormElement from "./FormElement";

function FormCard(props) {
  return (
      <Row>
        <Card as={Col} sm={12} className="rounded infoCard">
          {/* Card Title */}
          <h1 className="text-center mt-4">{props.title}</h1>
          <Form onSubmit={props.handleSubmit} className="p-4">
            <Form.Row>
              {/* Iterates through the fields stipulated and renders an input for each */}
              {props.formDetails.map((field) => (
                <FormElement
                  key={field.controlId}
                  controlId={field.controlId}
                  smallColSize={field.smallColSize}
                  formLabel={field.formLabel}
                  placeholder={field.placeholder}
                  name={field.name}
                  handleChange={props.handleChange}
                  value={field.value}
                />
              ))}
            </Form.Row>
          </Form>
        </Card>
      </Row>
  );
}

export default FormCard;
```

To make your card more interesting, add some animation. Use the `react-spring` hook `useSpring()` and react's `useState()` to add an animation on hover. First, import `useSpring` and `animated` from `react-spring`. Then, declare a boolean variable to hold the `hovered` state.
```js
import {useSpring, animated} from "react-spring";
```
```js
const [hovered, setHovered] = useState(false);
```
Then use a ternary operator to declare how you wish to see the css change when your card is hovered.
```js
const hovering = useSpring({
    transform: hovered
      ? "translate3d(0px,0,0) scale(1.05) rotateX(0deg)"
      : "translate3d(0px,0,0) scale(1) rotateX(0deg)",
  });
```
To hook it all together, wrap your card in an `animated.div` that toggles the hovered state and sets the style to represent your previously declared values. Once you've done this, `FormCard.js` should look something like:
```js
//FormCard.js

import React, { useState } from "react";
import { Row, Form, Card, Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import FormElement from "./FormElement";

function FormCard(props) {
  // Animation Value
  const [hovered, setHovered] = useState(false);
  // sets animation for the form when user hovers over it
  const hovering = useSpring({
    transform: hovered
      ? "translate3d(0px,0,0) scale(1.05) rotateX(0deg)"
      : "translate3d(0px,0,0) scale(1) rotateX(0deg)",
  });

  return (
    <animated.div
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={hovering}
    >
      <Row>
        <Card as={Col} sm={12} className="rounded infoCard">
          {/* Card Title */}
          <h1 className="text-center mt-4">{props.title}</h1>
          <Form onSubmit={props.handleSubmit} className="p-4">
            <Form.Row>
              {/* Iterates through the fields stipulated and renders an input for each */}
              {props.formDetails.map((field) => (
                <FormElement
                  key={field.controlId}
                  controlId={field.controlId}
                  smallColSize={field.smallColSize}
                  formLabel={field.formLabel}
                  placeholder={field.placeholder}
                  name={field.name}
                  handleChange={props.handleChange}
                  value={field.value}
                />
              ))}
            </Form.Row>
          </Form>
        </Card>
      </Row>
    </animated.div>
  );
}
export default FormCard;


```

As you can see above, mapping through `props.formDetails` creates each text field. Create those details now by navigating to your `FormContents` folder. Once there, create a file called `BuyerFormDetails`. This file only needs to hold a single, exported function. This function takes in variables (which will be supplied by the user) and returns the information needed to create a bootstrapped card.

<details>
<summary>Click to see BuyerFormDetails.js</summary>

```js
//BuyerFormDetails.js

const BuyerFormDetails = (
  buyerFirstName,
  buyerLastName,
  email,
  address,
  city,
  geoState,
  zipCode
) => [
  {
    controlId: "buyerFirstName",
    smallColSize: 6,
    value: buyerFirstName,
    formLabel: "First Name",
    placeholder: "Bob",
    name: "buyerFirstName",
  },
  {
    controlId: "buyerLastName",
    smallColSize: 6,
    value: buyerLastName,
    formLabel: "Last Name",
    placeholder: "Smith",
    name: "buyerLastName",
  },
  {
    controlId: "email",
    smallColSize: 12,
    value: email,
    formLabel: "Email",
    placeholder: "example@example.com",
    name: "email",
  },
  {
    controlId: "address",
    smallColSize: 12,
    value: address,
    formLabel: "Address",
    placeholder: "1234 Example Ave.",
    name: "address",
  },
  {
    controlId: "city",
    smallColSize: 6,
    value: city,
    formLabel: "City",
    placeholder: "New York",
    name: "city",
  },
  {
    controlId: "geoState",
    smallColSize: 2,
    value: geoState,
    formLabel: "State",
    placeholder: "NY",
    name: "geoState",
  },
  {
    controlId: "zipCode",
    smallColSize: 4,
    value: zipCode,
    formLabel: "Zip Code",
    placeholder: "10001",
    name: "zipCode",
  },
];
export default BuyerFormDetails;

```
</details>

While you are here, go ahead and create a second file in the `FormContents` folder entitled `CardFormDetails.js`. It will contain the needed information for the credit card form.

<details>
<summary>Click to see CardFormDetails.js</summary>

```js
//CardFormDetails.js

const CardFormDetails = (cardNum, cardName, expDate, cvv) => [
  {
    controlId: "cardNumber",
    smallColSize: 12,
    value: cardNum,
    formLabel: "Card Number",
    placeholder: "•••• •••• •••• ••••",
    name: "cardNum",
  },
  {
    controlId: "cardName",
    smallColSize: 12,
    value: cardName,
    formLabel: "Name on Card",
    placeholder: "Bob Smith",
    name: "cardName",
  },
  {
    controlId: "expirationDate",
    smallColSize: 6,
    value: expDate,
    formLabel: "Expiration Date",
    placeholder: "01/23",
    name: "expDate",
  },
  {
    controlId: "cvv",
    smallColSize: 6,
    value: cvv,
    formLabel: "Security Code",
    placeholder: "123",
    name: "cvv",
  },
];
export default CardFormDetails;


```
</details>

You will also need a submission button for your cards. Create one now in `App.js`.
```js
//App.js

<Row>
  <Col className={"text-center mb-3"}>
    <Button
      onClick={handleSubmit}
      className="infoCard"
      id="submit"
      variant="dark"
    >
      Complete Order
    </Button>
  </Col>
</Row>
```

At this point, navigate to `CartCard.js` and create a bootstrapped `Card` that takes in the user's current cart details and displays them. For this guide, the display can be fairly simple— just line items, individual prices, and the total price. If you would like to explore some of the other cart data that `Commerce.js` makes available, check out their [documentation](https://commercejs.com/docs/api/#retrieve-a-cart)

```js
//CartCard.js

import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function CartCard(props) {
  // Sets up a 'current cart' for the user (so they know what they're buying

  let cart;
  // if there is a cart, set variable 'cart' to reflect line items in it
  props.currentCart ? (cart = props.currentCart.line_items) : (cart = []);

  return (
    <Card id="cart">
      <Card.Title
        style={{ color: "white", fontSize: "20px" }}
        className="text-center"
      >
        Your Order
      </Card.Title>
      <Card.Body>
        {/* Iterates through items in cart and makes a row for each, displaying the item name and price */}
        {cart.map((item) => (
          <Row key={item.name}>
            <Col>
              <p style={{ float: "left" }} className="m-2">
                {item.name}
              </p>
              <p style={{ float: "right" }} className="m-2">
                {item.price.formatted}
              </p>
            </Col>
          </Row>
        ))}
        <hr></hr>
        {/* This displays the total price of all items in a user's cart */}
        <h4 className="text-center m-2">
          Total:{" "}
          {props.currentCart
            ? props.currentCart.live.total.formatted_with_symbol
            : "$0"}
        </h4>
      </Card.Body>
    </Card>
  );
}

export default CartCard;

```

Now return to `App.js`. Earlier, your component currently does not return anything other than an empty fragment. Place the following code into your file (and make sure to import the needed elements).

```js
//App.js

return(
  <Container>
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
        <CustomButton onSubmit={handleSubmit} text={"Complete Order"} />
      </Col>
      <Col md={true}></Col>
    </Row>
  </Container>
)

```

<details>
<summary>
Click here to see what `App.js` looks like at this point.</summary>

```js
//App.js

import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import {
  validateInputs,
  figureOutErrors,
  formatCreditCard,
  dateCheck,
  cvvCheck,
} from "./helperFunctions";
import FormCard from "./CardElements/FormCard";
import CartCard from "./CardElements/CartCard";
import CardFormDetails from "./FormContents/CardFormDetails";
import BuyerFormDetails from "./FormContents/BuyerFormDetails";
import CustomButton from "./CardElements/CustomButton";
import "./styles.scss";
import Commerce from "@chec/commerce.js";

const commerce = new Commerce("YOUR SANDBOX KEY GOES HERE");

function App() {
  // The checkout token itself
  const [checkoutToken, setCheckoutToken] = useState("");
  // Line Items in the current checkout Token
  const [lineItems, setLineItems] = useState("");
  // Raw user input for Credit Card Info
  const [cardState, setCardState] = useState({});

  // Formatted Values for Credit Card Info
  const [cardNum, setCardNum] = useState("");
  const [cardName, setName] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");

  //State for Buyer Info
  const [buyerFirstName, setBuyerFirstName] = useState("");
  const [buyerLastName, setBuyerLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [geoState, setGeoState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [validationInfo, setValidationInfo] = useState(null);
  // State for success/fail popup notifications
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);
  // Submission spinner toggle
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const handleCardChange = (evt) => {
    const value = evt.target.value;
    setCardState({
      ...cardState,
      [evt.target.name]: value,
    });
  };

  const handleFormChange = (text) => {
    let userCardInput = formatCreditCard(text);
    //sets card number hook with formatted/validated input
    setCardNum(userCardInput);
  };

  const handleDateChange = (text) => {
    let userDateInput = dateCheck(text);
    //sets expiration date hook with formatted/validated input
    setExpDate(userDateInput);
  };

  const handleCvvChange = (text) => {
    let userCvvInput = cvvCheck(text);
    //sets cvv hook with formatted/validated input
    setCvv(userCvvInput);
  };

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
    commerce.checkout
      .generateToken("YOUR PRODUCT PERMALINK GOES HERE", { type: "permalink" })
      .then((res) => {
        setCheckoutToken(res);
        setCurrentCart(res);
      })
      .catch((err) => {
        console.log("Something went wrong with the token generation", err);
      });
  }, []);

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
    <Container>
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
          <CustomButton onSubmit={handleSubmit} text={"Complete Order"} />
        </Col>
        <Col md={true}></Col>
      </Row>
    </Container>
  );
}

export default App;

```

</details>

Since you created `FormCard` as a pure function, you can collect whatever additional information you may desire— all you need to do is declare a new `<FormCard />` and pass in the details via the `formDetails` prop.

**8. The Animation**

Next, turn your attention to the animation folder. Set up `Animation.js` the same way you set up `three.js` animations in the [past guides](https://github.com/Andreloui5/CommerceWithThree-part2). Start by declaring the `canvas` element, camera, and lighting.


```js
//Animation.js

import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import "../styles.scss";

export default function Animation(props) {
  return (
    <div>
      <Canvas
        className={"cardAnimation"}
        camera={{ position: [0, 0, 25] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.35} />
        <spotLight
          intensity={1}
          position={[10, 60, 40]}
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
      </Canvas>
    </div>
  );
}

```

Next, navigate to `Scene.js` and import the model that you will use as the main object in this scene. This guide uses a [credit card model from sketchfab](https://sketchfab.com/models/130ec74a08b2445c91aae106d738d01e). Just as you did in the [last guide](https://github.com/Andreloui5/CommerceWithThree-part2), use `gltfjsx` to create editable, declarative models (just a reminder: you will need to add the gltf file and textures folder to your `public` folder). By changing the values of a mesh's `material` property, you can make the credit card look however you wish. This guide will be using .png files to replicate different credit cards. If needed, you can find the files this guide uses [here](https://github.com/Andreloui5/3DCreditCardForm/tree/master/src/assets/Cards).

```js
//Scene.js

import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Model(props) {
  // This renders the model for the credit card, and also loads the appropriate card background as user inputs change

  // loads background image
  const texture = useMemo(
    () => new THREE.TextureLoader().load(props.cardType),
    [props.cardType]
  );

  const group = useRef();
  // loads the card model
  const { nodes, materials } = useLoader(GLTFLoader, "./card/scene.gltf");
  // declares a new material and maps the background image to that material
  const material = new THREE.MeshPhysicalMaterial({ map: texture });

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} position={[-6.1, -9, 6]}>
        {/* Back of the card */}
        <mesh
          material={material}
          geometry={nodes.mesh_0.geometry}
          castShadow
          metalness={8}
        />
        {/* Outer rim of card */}
        <mesh
          material={materials.Card3initialSha}
          geometry={nodes.mesh_1.geometry}
          castShadow
        />
        {/* Front of Card */}
        <mesh
          material={material}
          geometry={nodes.mesh_2.geometry}
          castShadow
          metalness={8}
        />
      </group>
    </group>
  );
}
```

To make your credit card come alive even more, you will need to handle text within your animation. To do this, open `CardText.js`. Import `Text` from `drei` and declare the following functional component. Note that the component takes in rotation, position, font size, and text content via props.

```js
//CardText.js

import React from "react";
import { Text } from "drei";

function CardText(props) {
  // this element handles text elements that can then be rendered within our animation
  return (
    <Text
      rotation={props.rotation}
      position={props.position}
      color={"black"}
      fontSize={props.fontSize}
      font="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap"
      anchorX="left"
      anchorY="middle"
    >
      {props.text}
    </Text>
  );
}
export default CardText;
```

You now have all the elements you need to make up the card object in your animation. To put everything together, turn your attention to `Card.js`. Take advantage of React's `useRef()` hook to make your card rotate on the page, and wrap all of your elements in a `<group>`. Grouping ensures that the card, text, and magnetic strip will act as a single unit and not disparate elements.

It's also important to wrap the group in a `<Suspense>` element. By doing this, you ensure that the page will render and display a fallback, even if something happens to your animation. For the sake of this guide, import `Suspense` from react and use ```fallback={null}```.

```js
//Card.js

import React, { useRef, Suspense } from "react";
import CardText from "./CardText";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import Model from "./Scene";

function Card(props) {
  // this element is the credit card animation
  const creditCard = useRef();
  // card rotates automatically along the y axis
  useFrame(() => (creditCard.current.rotation.y += 0.003));

  return (
    <Suspense fallback={null}>
      <group ref={creditCard}>
        {/* Card itself */}
        <Model
          cardType={props.cardType}
          number={props.cardNum}
          name={props.cardName}
          expiry={props.expDate}
          cvv={props.cvv}
        />
        {/* Magnetic Strip on back of card */}
        <mesh receiveShadow position={[0.19, 3.1, 0.73]}>
          <planeBufferGeometry attach="geometry" args={[26.8, 3]} />
          <meshStandardMaterial
            attach="material"
            color="#0f0f0f"
            opacity={0.3}
            side={THREE.DoubleSide}
            metalness={6}
          />
        </mesh>
        {/* Card Number */}
        <CardText
          position={[-11, -0.4, 0.89]}
          text={props.number}
          fontSize={2}
        />
        {/* Customer Name */}
        <CardText position={[-11, -6, 0.89]} text={props.name} fontSize={1.8} />
        {/* Valid Thru */}
        <CardText position={[5, -4, 0.89]} text={"Valid Thru"} fontSize={1} />
        {/* Expiration Date */}
        <CardText position={[5, -6, 0.89]} text={props.expiry} fontSize={1.8} />
        {/* Cvv */}
        <CardText
          rotation={[0, Math.PI, 0]}
          position={[-5, 0, 0.73]}
          text={props.cvv}
          fontSize={1.9}
        />
      </group>
    </Suspense>
  );
}

export default Card;

```

To make your card appear in the scene, navigate back to `Animation.js`, import `Card`, and add the following code underneath the `<spotLight />` element:

```js
//Animation.js

<Card
  cardType={props.cardType}
  number={props.cardNum}
  name={props.cardName}
  expiry={props.expDate}
  cvv={props.cvv}
/>
```

Now is a good time to add controls to your animation. In `Controls.js` create the following functional component.

```js
//Controls.js

import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { extend, useThree, useFrame } from "react-three-fiber";
import "../styles.scss";

extend({ OrbitControls });

export default function Controls() {
  // Imports controls for the animation
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      // disables ability to pan and zoom the camera
      enablePan={false}
      enableZoom={false}
      ref={orbitRef}
      args={[camera, gl.domElement]}
    />
  );
}

```
Now add `<Controls />` to `Animation.js`.

To give the animation some depth, you can create a box around the card so that it looks like it is rotating within a small room. Start by creating a plane in `BackDrop.js`. Make sure to declare `THREE.DoubleSide` in your mesh. This declaration ensures that the plane is visible from both sides, which will be very important when you reposition these planes into a box.

```js
//BackDrop.js

import React from "react";
import * as THREE from "three";

function BackDrop({ position, rotation, opacity }) {
  // this element is one wall (used to make up the sides of the skybox background)
  return (
    <mesh receiveShadow position={position} rotation={rotation}>
      <planeBufferGeometry attach="geometry" args={[101, 101]} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        attach="material"
        color="#eeeeee"
        opacity={opacity}
      />
    </mesh>
  );
}

export default BackDrop;
```

Now, navigate to `Skybox.js` and return a fragment with six instances of `BackDrop`, positioned and rotated to make a box.

```js
//Skybox.js

import React from "react";
import BackDrop from "./BackDrop";

function Skybox() {
  return (
    <>
      <BackDrop
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -30, 0]}
        opacity={0.3}
      />
      <BackDrop
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 30, 0]}
        opacity={0.3}
      />
      <BackDrop rotation={[0, 0, 0]} position={[0, -1, -50]} opacity={0.35} />
      <BackDrop
        rotation={[0, Math.PI / 2, 0]}
        position={[-50, -1, 0]}
        opacity={0.35}
      />
      <BackDrop
        rotation={[0, Math.PI / 2, 0]}
        position={[50, -1, 0]}
        opacity={0.35}
      />
      <BackDrop rotation={[0, 0, 0]} position={[0, -1, 50]} opacity={0.35} />
    </>
  );
}

export default Skybox;
```

You can now add the `<Skybox />` element to your scene.

All together, `Animation.js` should look something like this:

<details>
<summary>Click to see the finished Animation.js file.</summary>

```js

// Animation.js

import React from "react";
import { Canvas } from "react-three-fiber";
import * as THREE from "three";
import Controls from "./Controls";
import Card from "./Card";
import Skybox from "./Skybox";
import "../styles.scss";

export default function Animation(props) {
  return (
    <div>
      <Canvas
        className={"cardAnimation"}
        camera={{ position: [0, 0, 25] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <Controls />
        {/* Lighting */}
        <ambientLight intensity={0.35} />
        <spotLight
          intensity={1}
          position={[10, 60, 40]}
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        {/* Animated Card */}
        <Card
          cardType={props.cardType}
          number={props.cardNum}
          name={props.cardName}
          expiry={props.expDate}
          cvv={props.cvv}
        />
        {/* Walls surrounding card */}
        <Skybox />
      </Canvas>
    </div>
  );
}

```
</details>


**9. Create a Form with Animation**

Now that you have built out `Animation.js`, you can combine it with an input form. Start by copying the code from `FormCard.js` into `FormCardWithAnimation.js` and then add `<Animation />` to the `<Form />`. (Be sure to pass the needed information into `<Animation />` via props.) You can also add some instructions for the user, so they know how to best interact with your card.

All told, your file should look something like this:

<details>
<summary>Click to see `FormCardWithAnimation.js`</summary>

```js
//FormCardWithAnimation.js

import React, { useState } from "react";
import { Row, Form, Card, Col } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import FormElement from "./FormElement";
import Animation from "../Animation/Animation";

function FormCardWithAnimation(props) {
  // Animation Value
  const [hovered, setHovered] = useState(false);
  // sets animation for checkout box when hovered
  const hovering = useSpring({
    transform: hovered
      ? "translate3d(0px,0,0) scale(1.05) rotateX(0deg)"
      : "translate3d(0px,0,0) scale(1) rotateX(0deg)",
  });

  return (
    <animated.div
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      style={hovering}
    >
      <Row>
        <Card as={Col} sm={12} className="rounded infoCard">
          <h1 className="text-center mt-4">{props.title}</h1>
          <p className="text-center" style={{ color: "#eae6e5" }}>
            Interact with the card and watch it respond as you enter numbers
            beginning with 4, 5, 6, 35, and 37.
            <span>
              <br></br>
            </span>
            Use 4242 4242 4242 4242 to test payment.
          </p>
          <Form onSubmit={props.handleSubmit} className="p-4 ">
            {/* Renders a canvas and animation to form */}
            <Animation
              cardNum={props.cardNum}
              cardName={props.cardName}
              expDate={props.expDate}
              cvv={props.cvv}
              cardType={props.cardType}
            />

            <Form.Row className="mt-3">
              {/* Iterates through the fields stipulated and renders an input for each */}
              {props.formDetails.map((field) => (
                <FormElement
                  key={field.controlId}
                  controlId={field.controlId}
                  smallColSize={field.smallColSize}
                  formLabel={field.formLabel}
                  placeholder={field.placeholder}
                  name={field.name}
                  handleChange={props.handleChange}
                  value={field.value}
                />
              ))}
            </Form.Row>
          </Form>
        </Card>
      </Row>
    </animated.div>
  );
}

export default FormCardWithAnimation;

```

</details>

Since you created `CardFormDetails.js` earlier, simply import `FormCardWithAnimation` in `App.js` and place the following code under `<FormCard />`.

```js
//App.js

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
```

**10. Making your Animated Card Dynamic**

To make your animation change as the user inputs their information, you will need one additional helper function. In `helperFunctions.js`, import the .png files you will be mapping to your animated card (the files used in this guide can be found [here](https://github.com/Andreloui5/3DCreditCardForm/tree/master/src/assets/Cards)). Then add the following function, which will take in a user's card number and return a string representing the user's card type.

```js
//helperFunctions.js

export function findCardType(number) {
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

```
Now return to `App.js` and import the function.

**11. Alerts**

The last thing you will need for a fully functional checkout experience is a way to provide feedback to your customer.

Navigate to `Spinner.js` and create a bootstrapped `<Spinner>`.
```js
//Spinner.js
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
```

Return to `App.js`, import your new component, and then the following code directly underneath the `<Container>` element.
```js
//App.js

<SubmissionSpinner visible={spinnerVisible} />
```

Another important way to provide feedback to your user is through the use of popup alerts. To make one, begin by importing `Alert` from "react-bootstrap". Then, directly underneath the `<Container>` element in `App.js`, use the `setShowSuccess` and `setShowFail` hooks you set up earlier to make your alerts render conditionally.

```js
//App.js

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

```


**12. That's it!**

You should have an application that uses `Commerce.js` to manage a user's checkout experience and a `Three.js` credit card that reflects a user's inputs as they type.

[View the live demo](https://2wx95.csb.app/)

## Built With

* [Commerce.js](https://commercejs.com/) - SDK for Chec commerce platform
* [Drei](https://github.com/react-spring/drei) - Helper components for react-three-fiber
* [Font Awesome](https://fontawesome.com/) - Scalable icon library
* [Gltfjsx](https://github.com/react-spring/gltfjsx) - Converts gltf files into jsx components
* [React.js](https://reactjs.org/) - The web framework used
* [React-Bootstrap](https://react-bootstrap.github.io/) - CSS framework for React
* [React-Spring](https://www.react-spring.io/) - Spring-physics based animation library
* [React-Three-Fiber](https://github.com/react-spring/react-three-fiber) - Reconciler for Three.js
* [Three.js](https://threejs.org/) - JavaScript 3D library

## Author

* **Craig Gant** - [Github](https://github.com/Andreloui5)