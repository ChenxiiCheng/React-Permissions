import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { getLoginUserAllPer } from '../../utils/auth';

const { SubMenu } = Menu;

class MenuBar extends Component {
  state = {
    current: 'user_mgr',
    perMenu: [], // 所有当前用户拥有的菜单类型的权限
  };

  componentDidMount() {
    // 加载当前登录用户的所有权限 /getUserPer/用户id
    getLoginUserAllPer().then((res) => {
      this.setState({ perMenu: res.filter((m) => m.type === 'menu') });
    });
  }

  handleMenuClick = (e) => {
    // 控制路由跳转
    this.setState({
      current: e.key,
    });
    let url = this.state.perMenu.find((item) => item.id == e.key).url;
    this.props.history.push(url);
  };

  render() {
    let rootMenu = this.state.perMenu.filter((m) => m.pId == 0);
    return (
      <div className="aside-menu-bar">
        <Menu
          onClick={this.handleMenuClick}
          // selectedKeys={[this.state.current]}
          mode="inline"
        >
          {rootMenu.map((rootM) => {
            let childMenus = this.state.perMenu.filter(
              (m) => m.pId == rootM.id
            );
            childMenus.sort((a, b) => a.order - b.order);
            return (
              <SubMenu
                key={rootM.id}
                title={
                  <span>
                    <Icon type="pie-chart" /> {rootM.des}
                  </span>
                }
              >
                {childMenus.map((childM) => {
                  return (
                    <Menu.Item key={childM.id}>
                      <Icon type="user-add" /> {childM.des}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </div>
    );
  }
}

export default withRouter(MenuBar);
