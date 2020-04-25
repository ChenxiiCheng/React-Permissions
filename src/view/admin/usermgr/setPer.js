import React, { Component } from 'react';
import { Modal, Row, Col, message, Checkbox } from 'antd';
import {
  loadAllPer,
  loadUserPer,
  addUserPer,
  deleteUserPer,
} from '../../../service';
import { formateDateToString } from '../../../utils/helper';

class SetPer extends Component {
  state = {
    allPer: [], // 所有的权限
    userPer: [], // 用户权限的默认关联
    allCheckedPer: [], // 所有选中的权限
  };

  async componentDidMount() {
    let allPer = await loadAllPer().then((res) => res.data);
    let userPer = await loadUserPer(this.props.data.id).then((res) => res.data);
    let allCheckedPer = [];
    userPer.forEach((up) => {
      let perObj = allPer.find((per) => per.id === up.permissionId);
      if (perObj) allCheckedPer.push(perObj);
    });

    this.setState({ allPer, userPer, allCheckedPer });
  }

  handleSubmitSetPer = () => {
    let { userPer, allCheckedPer } = this.state;
    let promiseArr = [];
    // 添加
    allCheckedPer.forEach((per, index) => {
      if (userPer.findIndex((up) => up.permissionId === per.id) < 0) {
        // 新添加
        promiseArr.push(
          addUserPer({
            id: Date.now() + index,
            del: 0,
            subon: formateDateToString(new Date()),
            userId: this.props.data.id,
            permissionId: per.id,
          })
        );
      }
    });
    // 删除
    userPer.forEach((up) => {
      if (allCheckedPer.findIndex((per) => per.id === up.permissionId) < 0) {
        // 删除权限
        promiseArr.push(deleteUserPer(up.id));
      }
    });

    Promise.all(promiseArr)
      .then((res) => {
        message.success('Success!');
        this.props.close();
      })
      .catch((err) => {
        message.error('Failed...');
      });
  };

  handleChangePer = (per, e) => {
    let allCheckedPer = [...this.state.allCheckedPer];
    if (e.target.checked) {
      // 添加到allCheckedPer里
      allCheckedPer.push(per);
    } else {
      // 从allCheckedPer里移除
      allCheckedPer = allCheckedPer.filter((p) => per.id !== p.id);
    }

    this.setState({ allCheckedPer });
  };

  render() {
    let { allPer, userPer } = this.state;
    return (
      <Modal
        title="Set Permission"
        okText="Set"
        cancelText="Cancel"
        onCancel={() => this.props.close()}
        visible={this.props.visible}
        onOk={this.handleSubmitSetPer}
        destroyOnClose
      >
        <h3>
          给用户: <span>{this.props.data.name}</span>设置权限
        </h3>
        <hr />
        <Row>
          {allPer.map((per) => {
            let checked = false;
            checked =
              userPer.findIndex((up) => up.permissionId === per.id) >= 0;
            return (
              <Col key={per.id} span={8}>
                <Checkbox
                  onChange={(e) => this.handleChangePer(per, e)}
                  defaultChecked={checked}
                >
                  {per.des}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      </Modal>
    );
  }
}

export default SetPer;
