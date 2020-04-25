import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../../components/textvalidator';
import { userLogin } from '../../service';
import { saveLoginUserInfo, saveLoginToken } from '../../utils/auth';
import { message } from 'antd';
import { urlParamsToObject } from '../../utils/helper';
import logo from '../../images/logo2.png';
import './login.scss';

class Login extends Component {
  state = {
    username: 'chenxii',
    password: '123456',
    code: '',
  };

  handleChange = (e) => {
    let newState = { [e.target.name]: e.target.value };
    this.setState((state) => ({ ...this.state, ...newState }));
  };

  // 表单校验通过, 请求提交表单接口
  handleSubmit = (e) => {
    e.preventDefault();
    let { history, location } = this.props;
    userLogin(this.state).then((res) => {
      if (res.data.code === 1) {
        // 保存用户登录信息
        saveLoginUserInfo(res.data.user);
        // 保存用户登录后，后台返回的token，身份信息
        saveLoginToken(res.data.token);
        // 跳转到请求之前的页面
        let url = '/home';
        // 判断当前请求地址中是否有preurl
        if (location.search) {
          let params = urlParamsToObject(location.search);
          if (params.preurl) {
            url = params.preurl;
          }
        }
        history.push(url);
      } else {
        message.error('Login failed, please enter correct password...');
      }
    });
  };

  changCode = (e) => {
    e.target.src = '/api/code/?id=' + Date.now();
  };

  render() {
    return (
      <div className="login">
        <div className="top">
          <div className="logo-wrap">
            <Link to="/home">
              <img src={logo} className="logo" alt="" />
            </Link>
          </div>
        </div>
        <div className="main-bd">
          <div className="login-box-wrap">
            <div className="login-box">
              <div className="login-left">
                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  className="input-group"
                >
                  <TextValidator
                    name="username"
                    value={this.state.username}
                    placeholder="Please enter phone number"
                    onChange={this.handleChange}
                    validators={['required', 'matchRegexp:[0-9a-zA-Z]{6,12}$']}
                    errorMessages={[
                      '*Please enter username!',
                      '*Please enter 6-12 characters',
                    ]}
                  />
                  <div className="input-group">
                    <TextValidator
                      type="password"
                      name="password"
                      value={this.state.password}
                      placeholder="Please enter password"
                      onChange={this.handleChange}
                      validators={[
                        'required',
                        'matchRegexp:[0-9a-zA-Z.]{6,20}$',
                      ]}
                      errorMessages={[
                        '*Please enter password!',
                        '*Please enter 6-20 characters',
                      ]}
                    />
                  </div>
                  <div className="code-group input-group">
                    <TextValidator
                      type="text"
                      name="code"
                      value={this.state.code}
                      className="code"
                      placeholder="Please enter QRcode"
                      onChange={this.handleChange}
                      validators={['required', 'matchRegexp:[0-9a-zA-Z]{5}$']}
                      errorMessages={[
                        '*Please enter QRcode!',
                        '*Please enter 5 characters',
                      ]}
                    />
                    <div className="img-code">
                      <img src="/api/code" onClick={this.changCode} alt="" />
                    </div>
                  </div>
                  <button type="submit" className="login-btn-group">
                    Login
                  </button>
                  <div className="link-group">Forgot password?</div>
                </ValidatorForm>
              </div>
              <div className="login-right">
                <p>Haven't registered yet?</p>
                <p className="active">Register</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main-ft">&copy;版权所有 chenxii.xyz 2020-2024</div>
      </div>
    );
  }
}

export default Login;
