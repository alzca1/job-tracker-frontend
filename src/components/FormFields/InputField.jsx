import React from "react";
import { Form } from "antd";

export default function InputField(props) {
  const { name, className, placeholder, defaultValue } = props;
  return (
    <Form.Item name={name}>
      <input
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
      />
    </Form.Item>
  );
}
