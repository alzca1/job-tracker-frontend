import { Button } from "antd";
import {
  CheckOutlined,
  ExclamationOutlined,
  LoadingOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const statusIcons = {
  idle: () => <SaveOutlined />,
  loading: () => <LoadingOutlined />,
  success: () => <CheckOutlined />,
  error: () => <ExclamationOutlined />,
};

export default function SaveStatusButton({ status }) {
  return (
    <Button className="SaveStatusButton" htmlType={"submit"}>
      {statusIcons[status]()}
    </Button>
  );
}
