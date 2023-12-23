import { Select } from "antd";

export default function StatusSelect({ defaultValue }) {
  const status = ["pending", "interview", "accepted", "rejected"];
  return (
    <Select style={{ width: "100%" }} defaultValue={defaultValue}>
      {status.map((status) => (
        <Select.Option key={status} value={status}>
          {status}
        </Select.Option>
      ))}
    </Select>
  );
}
