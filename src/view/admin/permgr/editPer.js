import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import EditPerForm from './editPerForm';

const EditPerFormComponent = Form.create({ name: 'edit_per' })(EditPerForm);

class EditPer extends Component {
  editForm = null;

  handleEditPer = () => {
    this.editForm.validateFields((err, values) => {
      if (err) {
        message.error('Please enter correct data');
        return;
      }
      let newPer = Object.assign({}, this.props.data, values);
      this.props
        .submitEditPer(newPer)
        .then((res) => {
          message.success('Edited success!');
          this.props.close();
        })
        .catch((err) => {
          message.error('Edited failed, please try again...');
        });
    });
  };

  render() {
    return (
      <Modal
        title="Modify Permission"
        okText="Modify"
        onOk={this.handleEditPer}
        cancelText="Cancel"
        onCancel={() => this.props.close()}
        visible={this.props.visible}
        destroyOnClose
      >
        <EditPerFormComponent
          data={this.props.data}
          ref={(form) => (this.editForm = form)}
        />
      </Modal>
    );
  }
}

export default EditPer;
