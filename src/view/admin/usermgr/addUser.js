import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import AddUserForm from './addUserForm';
import store from '../../../store';
import { AddUserActionAsync } from '../../../action/userAction';

const AddUserFormComponent = Form.create({ name: 'addUser_frm' })(AddUserForm);

class AddUser extends Component {
  // 表单实例，通过 ref或者wrappedComponentRef 绑定到表单实例上
  userAddForm = null;
  handleSubmit = (e) => {
    e.preventDefault();
    this.userAddForm.validateFields((err, data) => {
      // console.log(err);
      console.log(data);
      if (err) {
        return;
      }
      data.del = 0;
      data.id = Date.now();
      data.isTeacher = false;
      // 给上传的头像添加服务器前缀
      data.avatar = process.env.REACT_APP_BASEURL + data.avatar;
      store
        .dispatch(AddUserActionAsync(data))
        .then((res) => {
          message.success('Added success!');
          // 重置添加对话框和关闭对话框
          this.handleCloseModal();
        })
        .catch((err) => {
          message.error('Added failed! Please try again... ');
        });
    });
  };

  handleCloseModal = () => {
    this.userAddForm.resetFields();
    this.props.close();
  };

  render() {
    return (
      <Modal
        title="Add User Info"
        okText="Confirm"
        cancelText="Cancel"
        visible={this.props.visible}
        onCancel={() => {
          this.handleCloseModal();
        }}
        onOk={this.handleSubmit}
      >
        <AddUserFormComponent ref={(form) => (this.userAddForm = form)} />
      </Modal>
    );
  }
}

export default AddUser;
