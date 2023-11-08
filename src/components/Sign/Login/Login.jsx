import React from "react";
import { Button, Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login({ handleView }) {
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
          <Form name="login" className="sign-form" layout="vertical" size="large">
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
            Not registered yet? Click <Link to="/signup"> here </Link> to create an account
          </small>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
