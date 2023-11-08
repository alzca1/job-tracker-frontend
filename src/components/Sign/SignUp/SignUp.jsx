import { Button, Form, Input } from "antd";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useMutation } from "react-query";

export default function SignUp({ handleView }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const mutation = useMutation({
    mutationFn: (userCreation) => {
      return axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, userCreation);
    },
    onSuccess: (data, variables, context) => {
      debugger;
      sessionStorage.setItem(
        "user",
        JSON.stringify({ token: data.data.token, user: variables.email, name: variables.name })
      );
      handleView("HOME");
      console.log(data, variables);
    },
  });

  const handleSubmit = (data) => {
    debugger;
    const { email, name, password } = data;
    mutation.mutate({ name, email, password });
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="SignForm">
          <div className="sign-confirm">
            <h2>Hello stranger!</h2>
            <div>
              <span>Sign up to start tracking jobs</span>
            </div>
          </div>
          <Form
            name="signup"
            className="sign-form"
            layout="vertical"
            size="large"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
              className="label"
            >
              <Input.Password type="password" placeholder="Your password..." />
            </Form.Item>
            <Button block="true" size="large" type="primary" htmlType="submit">
              Sign up!
            </Button>
          </Form>
          <small>
            Already registered? Click <button onClick={() => handleView("LOGIN")}>here</button>
            to log into your account
          </small>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
