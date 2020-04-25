import React, { Component } from 'react';
import { Modal, Form } from 'antd';
import EditRoleForm from './editRoleForm';

const EditRoleFormComponent = Form.create({ name: 'form_edit' })(EditRoleForm);

class EditRow extends Component {
  editForm = null;
  handleEditRole = () => {
    this.editForm.validateFields((err, value) => {
      if (err) {
        return;
      }
      this.props.saveRole(Object.assign({}, this.props.data, value));
    });
  };

  render() {
    return (
      <Modal
        title="Edit Role"
        visible={this.props.visible}
        okText="Modify"
        cancelText="Cancel"
        onOk={this.handleEditRole}
        onCancel={() => this.props.close()}
        destroyOnClose
      >
        <EditRoleFormComponent
          ref={(form) => (this.editForm = form)}
          data={this.props.data}
        />
      </Modal>
    );
  }
}
export default EditRow;
