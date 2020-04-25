import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Top from '../../components/top';
import MenuBar from '../../components/menubar';
import UserMgr from '../admin/usermgr';
import RoleMgr from '../admin/rolemgr';
import PerMgr from '../admin/permgr';
import GoodsMgr from '../admin/goodsmgr';
import AuthRoute from '../../components/AuthRoute';
import axios from 'axios';
import { getLoginToken } from '../../utils/auth';

const { Header, Footer, Sider, Content } = Layout;

class Home extends Component {
  constructor(props) {
    super(props);
    // 设置当前用户ajax请求的token
    axios.defaults.headers['Authorization'] = getLoginToken();

    // 用户刷新页面时，重新获取登录用户的权限并更新到localStorage
    localStorage.removeItem('LOGIN_USER_PER');
  }

  render() {
    const { match } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{ color: '#fff', padding: '0', backgroundColor: '#0779e4 ' }}
        >
          <Top />
        </Header>
        <Layout>
          <Sider style={{ backgroundColor: '#fff' }} width={310}>
            <MenuBar />
          </Sider>
          <Content style={{ padding: '15px' }}>
            <Switch>
              <AuthRoute
                per={1570872984243}
                path={`${match.path}/user_mgr`}
                component={UserMgr}
              />
              <AuthRoute
                per={1570873025381}
                path={`${match.path}/role_mgr`}
                component={RoleMgr}
              />
              <AuthRoute
                per={1570873044424}
                path={`${match.path}/per_mgr`}
                component={PerMgr}
              />
              <Route path={`${match.path}/goods_mgr`} component={GoodsMgr} />
              <Route
                render={() => (
                  <h3>Welcome to role permission management system</h3>
                )}
              />
            </Switch>
          </Content>
        </Layout>
        <Footer
          style={{
            backgroundColor: '#f4f4f4',
            height: '30px',
            textAlign: 'center',
          }}
        >
          &copy; Chenxii 2020
        </Footer>
      </Layout>
    );
  }
}

export default Home;
