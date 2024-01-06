import { Form, Select } from "antd";

export default function StatusSelect({ setTemporaryStatus }) {
  const status = ["pending", "interview", "accepted", "rejected"];

  const style = {
    backgroundColor: "transparent",
    backdropFilter: "blur(10px)",
    textAlign: "center",
  };

  const handleTemporaryStatus = (status) => {
    setTemporaryStatus(status);
  };

  return (
    <Form.Item name="status">
      <Select style={{ width: "100%" }} dropdownStyle={style} onChange={handleTemporaryStatus}>
        {status.map((status) => (
          <Select.Option key={status} value={status}>
            {status}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
}
