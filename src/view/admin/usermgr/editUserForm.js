import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';

class EditUserForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      name: this.props.data.name,
      username: this.props.data.username,
      email: this.props.data.email,
      phone: this.props.data.phone,
      password: this.props.data.password,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please enter username',
              },
            ],
          })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
        </Form.Item>
        <Form.Item label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                min: 6,
                message: 'Please enter at least 6 digits',
              },
              {
                max: 20,
                message: 'Please keep digits below 20',
              },
              {
                required: true,
                message: 'Please enter password',
              },
            ],
          })(
            <Input.Password
              prefix={<Icon type="safety" />}
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item label="Email">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'Please enter correct type of email!',
              },
              {
                required: true,
                message: 'Please enter email',
              },
            ],
          })(<Input prefix={<Icon type="mail" />} placeholder="Email" />)}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [
              {
                min: 2,
                message: 'Please enter at least 2 characters!',
              },
              {
                required: true,
                message: 'Please enter name',
              },
            ],
          })(<Input prefix={<Icon type="user" />} placeholder="Name" />)}
        </Form.Item>
        <Form.Item label="Phone">
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'Please enter phone',
              },
            ],
          })(<Input prefix={<Icon type="phone" />} placeholder="Phone" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default EditUserForm;
