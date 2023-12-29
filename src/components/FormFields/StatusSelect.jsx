import { Form, Select } from "antd";

export default function StatusSelect() {
  const status = ["pending", "interview", "accepted", "rejected"];
  return (
    <Form.Item name="status">
      <Select style={{ width: "100%" }}>
        {status.map((status) => (
          <Select.Option key={status} value={status}>
            {status}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
