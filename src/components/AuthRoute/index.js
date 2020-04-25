import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { getLoginUserAllPer } from '../../utils/auth';

class AuthRoute extends Component {
  state = {
    authorized: false,
  };

  componentDidMount() {
    getLoginUserAllPer().then((res) => {
      let authorized = res.findIndex((per) => per.id === this.props.per) >= 0;
      this.setState({ authorized });
    });
  }

  componentWillReceiveProps() {
    // 判断当前传来的属性是谁，然后判断当前登录是否需拥有此路由的权限
    // 如果有权限，返回Route对象
    // 如果没有权限返回null
    // per属性是当前路由对应的权限数据的id
    // this.props.per
    // 拿到当前登录用户的所有权限
    getLoginUserAllPer().then((res) => {
      let authorized = res.findIndex((per) => per.id === this.props.per) >= 0;
      this.setState({ authorized });
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.authorized ? (
          <Route {...this.props} />
        ) : (
          <Route path={this.props.path} render={() => <h3>没有权限</h3>} />
        )}
      </Fragment>
    );
  }
}

export default AuthRoute;
