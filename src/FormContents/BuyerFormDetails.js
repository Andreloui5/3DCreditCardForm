const BuyerFormDetails = (buyerName, address, cityState, zipCode) => [
  {
    controlId: "buyerName",
    smallColSize: 12,
    value: buyerName,
    formLabel: "First and Last Name",
    placeholder: "Bob Smith",
    name: "buyerName",
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
    controlId: "cityState",
    smallColSize: 6,
    value: cityState,
    formLabel: "City and State",
    placeholder: "Example, CA",
    name: "cityState",
  },
  {
    controlId: "zipCode",
    smallColSize: 6,
    value: zipCode,
    formLabel: "Zip Code",
    placeholder: "90210",
    name: "zipCode",
  },
];
export default BuyerFormDetails;
