import React, { Component } from 'react';
import { Form, Input, Icon, Select } from 'antd';

const { Option } = Select;

class EddPerForm extends Component {
  componentDidMount() {
    const { data } = this.props;
    this.props.form.setFieldsValue({
      pId: data.pId,
      type: data.type,
      order: data.order,
      des: data.des,
      code: data.code,
      url: data.url,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        layout="horizontal"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
      >
        <Form.Item label="Permission Name">
          {getFieldDecorator('des', {
            rules: [
              {
                min: 2,
                max: 20,
                message: 'Please enter 2-20 characters',
              },
              {
                required: true,
                message: 'Please enter permission name',
              },
            ],
          })(
            <Input
              prefix={<Icon type="smile" />}
              placeholder="Permission Name"
            />
          )}
        </Form.Item>
        <Form.Item label="Permission Type">
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: 'Please select permission type',
              },
            ],
          })(
            <Select>
              <Option value="menu">菜单权限</Option>
              <Option value="action">请求权限</Option>
              <Option value="router">路由权限</Option>
              <Option value="resource">资源权限</Option>
              <Option value="component">组件权限</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Permission Code">
          {getFieldDecorator('code', {
            rules: [
              {
                min: 2,
                max: 20,
                message: 'Please enter 2-20 characters',
              },
            ],
          })(
            <Input
              prefix={<Icon type="setting" />}
              placeholder="Permission Code"
            />
          )}
        </Form.Item>
        <Form.Item label="Parent Permission">
          {getFieldDecorator('pId', {
            rules: [
              {
                required: true,
                message: 'Please enter parent permission',
              },
            ],
          })(
            <Input
              prefix={<Icon type="user" />}
              placeholder="Parent Permission"
            />
          )}
        </Form.Item>
        <Form.Item label="URL">
          {getFieldDecorator('url')(
            <Input prefix={<Icon type="mail" />} placeholder="URL" />
          )}
        </Form.Item>
        <Form.Item label="Order">
          {getFieldDecorator('order')(
            <Input prefix={<Icon type="user" />} placeholder="Order" />
          )}
        </Form.Item>
      </Form>
    );
  }
}

export default EddPerForm;
