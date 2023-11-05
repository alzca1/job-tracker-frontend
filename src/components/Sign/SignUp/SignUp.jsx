import { Button, Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function SignUp({ handleView }) {
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
          <Form name="signup" className="sign-form" layout="vertical" size="large">
            <Form.Item
              label="Name"
              name="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
              className="label"
            >
              <Input type="password" placeholder="Your password..." />
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
