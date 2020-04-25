import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import EditUserForm from './editUserForm';
import store from '../../../store';
import { EditUserActionAsync } from '../../../action/userAction';

const EditUserFormComponent = Form.create({ name: 'edit_form' })(EditUserForm);

class EditUser extends Component {
  editForm = null;
  handleEditUser = () => {
    this.editForm.validateFields((err, values) => {
      // console.log(err)
      // console.log(values);
      if (err) {
        return;
      }
      // 提交表单
      // this.props.data
      let newUser = { ...this.props.data, ...values };
      store
        .dispatch(EditUserActionAsync(newUser))
        .then((res) => {
          message.success('Edited success');
          this.props.close();
        })
        .catch((err) => {
          console.log(err);
          message.error('Edited failed, please try again...');
        });
    });
  };
  render() {
    return (
      <Modal
        title="Edit User Info"
        visible={this.props.visible}
        okText="Edit"
        cancelText="Cancel"
        onOk={this.handleEditUser}
        onCancel={() => this.props.close()}
        destroyOnClose={true}
      >
        <EditUserFormComponent
          ref={(form) => (this.editForm = form)}
          data={this.props.data}
        />
      </Modal>
    );
  }
}

export default EditUser;
