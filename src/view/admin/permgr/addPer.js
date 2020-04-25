import React, { Component } from 'react';
import { Modal, Form, message } from 'antd';
import AddPerForm from './addPerForm';
import { formateDateToString } from '../../../utils/helper';
import { getLoginUserInfo } from '../../../utils/auth';

const AddPerFormComponent = Form.create({ name: 'add_per' })(AddPerForm);

class AddPer extends Component {
  addForm = null;
  handleAddPer = () => {
    this.addForm.validateFields((err, values) => {
      if (err) {
        message.error('Added failed...');
        return;
      }
      let newPer = Object.assign(
        {
          id: Date.now(),
          del: 0,
          status: 0,
          subon: formateDateToString(new Date()),
          subby: getLoginUserInfo().id,
        },
        values
      );
      this.props
        .addPer(newPer)
        .then((res) => {
          message.success('Added success!');
          this.props.close();
        })
        .catch((err) => {
          message.error('Added failed...');
        });
    });
  };
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onOk={this.handleAddPer}
        onCancel={() => this.props.close()}
        destroyOnClose
        okText="Add"
        cancelText="Cancel"
        title="Edit Permission"
      >
        <AddPerFormComponent ref={(form) => (this.addForm = form)} />
      </Modal>
    );
  }
}
export default AddPer;
