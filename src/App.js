import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './view/home';
import About from './view/about';
import Login from './view/login';
import Empty from './view/empty';
import { authLogin } from './utils/auth';
import './App.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return <Redirect to="/home" />;
          }}
        />
        <Route
          path="/home"
          render={(props) => {
            // 校验当前用户是否登录，如果没有登录，跳转到登陆界面
            if (!authLogin()) {
              // 跳转到登陆页面前，记录当前用户要请求的页面，登录成功后会
              // 跳转到用户之前要请求的页面(这部分后面补)
              return <Redirect to={`/login?preurl=${props.match.path}`} />;
            }
            // 权限校验
            return <Home {...props} />;
          }}
        />
        <Route
          path="/about"
          render={(props) => {
            // 校验当前用户是否登录，如果没有登录，跳转到登陆界面
            if (!authLogin()) {
              // 跳转到登陆页面前，记录当前用户要请求的页面，登录成功后会
              // 跳转到用户之前要请求的页面(这部分后面补)
              return <Redirect to={`/login?preurl=${props.match.path}`} />;
            }
            // 权限校验
            return <About {...props} />;
          }}
        />
        <Route path="/login" exact component={Login} />
        <Route component={Empty} />
      </Switch>
    </Router>
  );
}

export default App;
