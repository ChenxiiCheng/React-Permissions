import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import AddRoleForm from './addRoleForm';

const AddRoleFormComponent = Form.create({ name: 'add_role' })(AddRoleForm);

class AddRole extends Component {
  formAddRole = null;
  handleAddUser = () => {
    this.formAddRole.validateFields((err, values) => {
      if (err) {
        return;
      }
      // 父级传过来的方法，注意在rolemgr里我们采用状态提升，没用redux
      this.props.addRole(values);
    });
  };

  render() {
    return (
      <Modal
        title="Add Role"
        visible={this.props.visible}
        onOk={this.handleAddUser}
        onCancel={() => this.props.close()}
        okText="Add"
        cancelText="Cancel"
        destroyOnClose
      >
        <AddRoleFormComponent ref={(form) => (this.formAddRole = form)} />
      </Modal>
    );
  }
}

export default AddRole;
