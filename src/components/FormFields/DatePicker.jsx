import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import React from "react";

const dateFormat = "DD/MM/YYYY";
const today = dayjs();

export default function DateField({ name, defaultValue, className }) {
  return (
    <Form.Item name={name}>
      <DatePicker className={className} format={dateFormat} />
    </Form.Item>
  );
}
