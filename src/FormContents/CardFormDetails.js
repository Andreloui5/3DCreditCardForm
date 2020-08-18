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
