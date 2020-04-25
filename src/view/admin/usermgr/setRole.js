import React, { Component } from 'react';
import { Modal, Checkbox, Row, Col, message } from 'antd';
import {
  loadAllRoles,
  loadUserRoles,
  addUserRole,
  deleteUserRole,
} from '../../../service';
import { formateDateToString } from '../../../utils/helper';

class setRole extends Component {
  state = {
    allRoles: [], // 所有的角色信息的数组
    userRoles: [], // 当前用户已经关联的所有角色中间表数据
    allCheckedRole: [], // 当前选中的所有角色
  };

  // 先请求userRoles且更新完state后再执行loadAllRoles()
  async componentDidMount() {
    let userRoles = await loadUserRoles(this.props.data.id);
    let roles = await loadAllRoles();
    let checkedRoleArr = [];

    // 给已经默认设置了关联的角色添加到allCheckedRole数组中去
    userRoles.data.forEach((userRole) => {
      let roleInfo = roles.data.find((role) => role.id === userRole.roleId);
      if (roleInfo) {
        checkedRoleArr.push(roleInfo);
      }
    });
    this.setState({
      userRoles: userRoles.data,
      allRoles: roles.data,
      allCheckedRole: checkedRoleArr,
    });
  }

  handleChangeCheckbox = (role, e) => {
    // console.log(e.target.checked);
    // console.log(role);
    let checkedRoleArr = [...this.state.allCheckedRole];
    if (e.target.checked) {
      checkedRoleArr.push(role);
    } else {
      checkedRoleArr = checkedRoleArr.filter((item) => item.id !== role.id);
    }
    this.setState({ allCheckedRole: checkedRoleArr });
  };

  handleSubmitSetRole = () => {
    // console.log(this.state.allCheckedRole);
    let { allCheckedRole, userRoles } = this.state;
    let promiseArr = [];
    // 判断要添加的
    // 最终的选中的role集合中不再原来的关联表中存在，就是添加的新关联
    allCheckedRole.forEach((role, index) => {
      let addRoleIndex = userRoles.findIndex(
        (userRole) => userRole.roleId === role.id
      );
      if (addRoleIndex < 0) {
        // 添加关联
        let p1 = addUserRole({
          id: Date.now() + index,
          del: 0,
          subon: formateDateToString(new Date()),
          roleId: role.id,
          userId: this.props.data.id,
        });
        promiseArr.push(p1);
      }
    });
    // 判断要删除的
    userRoles.forEach((userRole) => {
      let searchRoleIndex = allCheckedRole.findIndex(
        (role) => role.id === userRole.roleId
      );
      if (searchRoleIndex < 0) {
        // 进行删除的关系
        let p2 = deleteUserRole(userRole.id);
        promiseArr.push(p2);
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

  render() {
    return (
      <Modal
        title="User Set Up Role"
        visible={this.props.visible}
        okText="Set up"
        cancelText="Cancel"
        onOk={this.handleSubmitSetRole}
        onCancel={() => this.props.close()}
        destroyOnClose
      >
        <h3>
          给用户：{this.props.data ? this.props.data.name : null} 设置角色
        </h3>
        <hr />
        <Row>
          {this.state.allRoles.map((role) => {
            let checked = false;
            // 判断当前用户是否已经关联了当前的角色信息
            if (
              this.state.userRoles.find(
                (userRole) => userRole.roleId === role.id
              )
            ) {
              checked = true;
            }
            return (
              <Col span={8} key={role.id}>
                <Checkbox
                  onChange={(e) => {
                    this.handleChangeCheckbox(role, e);
                  }}
                  defaultChecked={checked}
                >
                  {role.name}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      </Modal>
    );
  }
}

export default setRole;
