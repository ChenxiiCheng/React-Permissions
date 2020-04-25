import React, { Component } from 'react';
import { Form, Icon, Input } from 'antd';

class AddRoleForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({ pId: 0 });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Form.Item label="Role Name">
          {getFieldDecorator('name', {
            rules: [
              {
                min: 2,
                max: 20,
                message: 'Please enter 2-20 characters',
              },
              {
                required: true,
                message: 'Please enter role name',
              },
            ],
          })(<Input prefix={<Icon type="smile" />} placeholder="Role name" />)}
        </Form.Item>
        <Form.Item label="Role Desc">
          {getFieldDecorator('des', {
            rules: [
              {
                min: 2,
                max: 20,
                message: 'Please enter 2-20 characters',
              },
            ],
          })(
            <Input prefix={<Icon type="setting" />} placeholder="Role Desc" />
          )}
        </Form.Item>
        <Form.Item label="Parent Role">
          {getFieldDecorator('pId', {
            rules: [
              {
                required: true,
                message: 'Please enter parent role',
              },
            ],
          })(<Input prefix={<Icon type="user" />} placeholder="Parent Role" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default AddRoleForm;
