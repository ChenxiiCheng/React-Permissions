import { loadUserAllPer } from '../service';

// 当前登录用户的sessionStorage的key
const APP_LOGIN_USER = 'APP_LOGIN_USER';

/**
 * 校验当前用户是否已经登录
 * return { Boolean } 如果已经登录: true, 否则: false
 */
export function authLogin() {
  // localStorage 存储当前的登录信息
  let loginUser = localStorage.getItem(APP_LOGIN_USER);
  if (loginUser) {
    return true;
  } else {
    return false;
  }
}

/**
 * 存储当前用户登录的信息到本地存储
 * @param {Object} user
 * @return void
 */
export function saveLoginUserInfo(user) {
  localStorage.setItem(APP_LOGIN_USER, JSON.stringify(user));
}

/**
 * 获取当前用户登录的信息到本地存储
 * @return {Object} user
 */
export function getLoginUserInfo() {
  let userStr = localStorage.getItem(APP_LOGIN_USER);
  if (userStr) {
    return JSON.parse(userStr);
    // console.log(userStr);
  } else {
    return null;
  }
}

/**
 * 当前用户登出，处理后续相关的信息
 * @return {Object} user
 */
export function logout() {
  localStorage.clear(); // 清空所有的用户登录信息
}

/**
 * 保存用户登录后的token
 * @param {String} token
 */
export function saveLoginToken(token) {
  localStorage.setItem('Authorization', token);
}

/**
 * 获取用户登录后的token
 * @param {String} token
 */
export function getLoginToken() {
  return localStorage.getItem('Authorization');
}

/**
 * 获取当前登录用户的所有权限
 * @return {Promise} 对象内部返回当前登录用户的所有权限
 */
export function getLoginUserAllPer() {
  // 拿到当前登录用户的id
  let userId = getLoginUserInfo().id;
  // 第一步：先从缓存中获取当前登录用户的所有权限。如果有直接返回
  let loginUserPerStr = localStorage.getItem('LOGIN_USER_PER');
  if (loginUserPerStr) {
    return Promise.resolve(JSON.parse(loginUserPerStr));
  }

  // 如果没有，才发送 ajax请求获取当前登录用户的所有权限
  return loadUserAllPer(userId).then((res) => {
    localStorage.setItem('LOGIN_USER_PER', JSON.stringify(res.data));
    return res.data;
  });
}
