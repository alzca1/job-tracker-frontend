import { DatePicker, Form } from "antd";
import dayjs from "dayjs";

const dateFormat = "DD/MM/YYYY";
const today = dayjs();

export default function DateField({ name, defaultValue, className }) {
  return (
    <Form.Item name={name}>
      <DatePicker
        className={className}
        format={dateFormat}
        defaultValue={defaultValue ? dayjs(defaultValue) : today}
      />
    </Form.Item>
  );
}
