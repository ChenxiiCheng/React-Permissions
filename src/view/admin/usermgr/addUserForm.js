import React, { Component } from 'react';
import { Form, Input, Icon, Upload, Button } from 'antd';
import { getLoginToken } from '../../../utils/auth';

class AddUserForm extends Component {
  handleChangeAvatar = (e) => {
    if (e.file.response) {
      console.log(e.file.response);
      return e.file.response.img;
    }
    return '';
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="horizontal"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Form.Item label="Avatar">
          {getFieldDecorator('avatar', {
            getValueFromEvent: this.handleChangeAvatar,
            rules: [
              {
                required: true,
                message: 'Please upload avatar',
              },
            ],
          })(
            <Upload
              accept="image/*"
              action="/per/upload"
              headers={{ Authorization: getLoginToken() }}
              name="imgF"
              listType="picture"
              onChange={this.handleChangeAvatar}
            >
              <Button>上传头像</Button>
            </Upload>
          )}
        </Form.Item>
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
export default AddUserForm;
