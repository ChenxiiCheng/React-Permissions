import React, { Component } from 'react';
import { Row, Col, Checkbox, message } from 'antd';
import { formateDateToString } from '../../../utils/helper';
import {
  loadAllPer,
  loadRolePer,
  addRolePer,
  deleteRolePer,
} from '../../../service';

class setRolePer extends Component {
  state = {
    allPer: [], // 所有的权限数据
    rolePer: [], // 默认角色关联的权限中间数据
    allCheckedPer: [], // 最终用户所有选中的权限
  };
  async componentDidMount() {
    // 加载所有的权限数据
    let allPer = await loadAllPer().then((res) => res.data);
    let rolePer = await loadRolePer(this.props.data.id).then((res) => res.data);
    let allCheckedPer = [];

    rolePer.forEach((rolePer) => {
      let per = allPer.find((per) => per.id === rolePer.permissionId);
      if (per) allCheckedPer.push(per);
    });

    this.setState({
      allPer: allPer,
      rolePer: rolePer,
      allCheckedPer: allCheckedPer,
    });
  }

  handleChangeCheck = (per, e) => {
    let allCheckedPer = [...this.state.allCheckedPer];
    // 一种选中
    if (e.target.checked) {
      allCheckedPer.push(per);
    } else {
      // 另一种取消选中
      allCheckedPer = allCheckedPer.filter((item) => item.id !== per.id);
    }
    this.setState({ allCheckedPer });
  };

  handleSubmitSetRolePer = () => {
    let { allCheckedPer, rolePer } = this.state;
    let promiseArr = [];
    allCheckedPer.forEach((per, index) => {
      if (rolePer.findIndex((rp) => rp.permissionId === per.id) < 0) {
        // 添加
        promiseArr.push(
          addRolePer({
            id: Date.now() + index,
            del: 0,
            subon: formateDateToString(new Date()),
            permissionId: per.id,
            roleId: this.props.data.id,
          })
        );
      }
    });

    // 删除的
    rolePer.forEach((rp) => {
      if (allCheckedPer.findIndex((per) => per.id === rp.permissionId) < 0) {
        promiseArr.push(deleteRolePer(rp.id));
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
    let { allPer, rolePer } = this.state;
    return (
      <div>
        <h3>
          给角色：<span style={{ color: 'red' }}>{this.props.data.name}</span>{' '}
          设置权限
        </h3>
        <hr />
        <Row>
          {allPer.map((per) => {
            let checked = false;
            let index = rolePer.findIndex((rp) => rp.permissionId === per.id);
            checked = index >= 0;
            return (
              <Col key={per.id} span={8}>
                <Checkbox
                  onChange={(e) => this.handleChangeCheck(per, e)}
                  defaultChecked={checked}
                >
                  {per.des}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default setRolePer;
