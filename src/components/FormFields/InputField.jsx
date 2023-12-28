import { Form, Input } from "antd";

export default function InputField(props) {
  const { name, className, placeholder, defaultValue, label } = props;
  return (
    <Form.Item name={name} label={label}>
      <Input
        className={className}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
      />
    </Form.Item>
  );
}
