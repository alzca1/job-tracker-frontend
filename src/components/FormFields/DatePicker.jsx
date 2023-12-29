import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

const dateFormat = "DD/MM/YYYY";

export default function DateField({ name, className }) {
  return (
    <Form.Item name={name}>
      <DatePicker className={className} format={dateFormat} />
    </Form.Item>
  );
}
