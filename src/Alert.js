import React from "react";
import { Alert } from "antd";

export default function Popup(props) {
  return (
    <Alert
      message={props.message}
      description={props.description}
      type={props.type}
      showIcon
    />
  );
}
