import { Button } from "antd";
import {
  CheckOutlined,
  ExclamationOutlined,
  LoadingOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

export default function SaveStatusButton({ status }) {
  const statusIcons = {
    idle: <SaveOutlined />,
    loading: <LoadingOutlined />,
    success: <CheckOutlined />,
    error: <ExclamationOutlined />,
  };
  return (
    <Button className="SaveStatusButton" htmlType="submit">
      {statusIcons[status]}
    </Button>
  );
}
