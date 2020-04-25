import React, { Component } from 'react';
import { Form, Input, Icon } from 'antd';

class EditRoleForm extends Component {
  componentDidMount() {
    let role = this.props.data;
    this.props.form.setFieldsValue({
      pId: role.pId,
      name: role.name,
      des: role.des,
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

export default EditRoleForm;
