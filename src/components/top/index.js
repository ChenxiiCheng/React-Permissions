import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Modal } from 'antd';
import { getLoginUserInfo, logout } from '../../utils/auth';
import './top.scss';

class Top extends Component {
  state = {
    loginUser: getLoginUserInfo(),
  };

  handleLogout = () => {
    Modal.confirm({
      title: 'Tip',
      content: 'Are YOU sure to logout?',
      okText: 'Logout',
      cancelText: 'Cancel',
      onOk: () => {
        logout(); // 清理当前用户在localStorage的信息
        this.props.history.push('/login');
      },
    });
  };

  render() {
    const { loginUser } = this.state;
    return (
      <Fragment>
        <div className="logo-wrap components-top">
          <a href="/">
            <h1
              style={{ color: '#fff', fontSize: '20px', paddingLeft: '12px' }}
            >
              <Icon type="slack" /> Permission Management System
            </h1>
          </a>
        </div>
        <div className="user-wrap components-top">
          <div className="btn-group">
            <Icon type="user" /> <span>{loginUser && loginUser.username}</span>
          </div>
          <div className="btn-group" onClick={this.handleLogout}>
            <Icon type="logout" /> Logout
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Top);
