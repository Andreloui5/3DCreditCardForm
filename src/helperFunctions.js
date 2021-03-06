import valid from "card-validator";
import Amex from "./assets/Cards/Amex.png";
import Default from "./assets/Cards/Default.png";
import Diners from "./assets/Cards/Diners.png";
import Discover from "./assets/Cards/Discover.png";
import Jcb from "./assets/Cards/Jcb.png";
import Visa from "./assets/Cards/Visa.png";
import Mastercard from "./assets/Cards/Mastercard.png";

export function validateInputs(name, number, date, cvv) {
  // check for a (potentially) valid credit card number
  const numberValidation = valid.number(number).isValid;
  const nameValidation = typeof name === "string" ? true : false;
  const expValidation = valid.expirationDate(date).isValid;
  const cvvValidation = valid.cvv(cvv).isValid;

  // if all are valid, return true
  if (numberValidation && nameValidation && expValidation && cvvValidation) {
    return true;
  } else {
    return false;
  }
}

export function figureOutErrors(name, number, date, cvv) {
  //systematically goes through form and checks for errors in the fields (Ordered from the top down on the form, so that user's won't feel like they're backtracking.)
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
    // 3 is for american express (has differnt formatting than other cards)
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
