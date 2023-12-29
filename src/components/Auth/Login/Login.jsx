import { Button, Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (userLogin) => {
      return axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, userLogin);
    },
    onSuccess: (data) => {
      const { token, name, email } = data.data;
      sessionStorage.setItem("user", JSON.stringify({ token: token, user: email, name: name }));
      navigate("/home");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="SignForm">
          <div className="sign-confirm">
            <h2>Welcome back!</h2>
            <div>
              <span>Log in to start tracking jobs</span>
            </div>
          </div>
          <Form
            name="login"
            className="sign-form"
            layout="vertical"
            size="large"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
              className="label"
            >
              <Input placeholder="Your email..." />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
              className="label"
              labelAlign="left"
            >
              <Input type="password" placeholder="Your password..." />
            </Form.Item>

            <Button block="true" size="large" type="primary" htmlType="submit">
              Log in
            </Button>
          </Form>

          <small>
            Not registered yet? Click <Link to="?mode=signup"> here </Link> to create an account
          </small>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
