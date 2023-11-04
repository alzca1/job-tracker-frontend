import React from "react";
import { Button, Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";

export const Login = () => {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="LoginForm">
          <div className="login-confirm">
            <h2>Welcome back!</h2>
            <div>
              <span>Log in to start tracking jobs</span>
            </div>
          </div>
          <Form name="login" className="login-form" layout="vertical" size="large">
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
              className="label"
            >
              <Input placeholder="Your email..." />
            </Form.Item>

            <Form.Item
              label="Password"
              name="Password"
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
            Not registered yet? Click <a>here</a> to create an account
          </small>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
