import React from "react";
import { Form, Input } from "antd";

export default function InputField(props) {
  const { name, className, placeholder, defaultValue } = props;
  return (
    <Form.Item name={name}>
      <Input
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
      />
    </Form.Item>
  );
}
