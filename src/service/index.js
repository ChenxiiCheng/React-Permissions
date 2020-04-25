import axios from 'axios';

axios.interceptors.request.use(
  function (config) {
    // 在此判断当前用户是否拥有请求此地址的权限
    // 如果有那么放行，如果没有需要截断次请求
    // 如何判断当前用户是否拥有此请求权限？

    // 你要请求的url地址，设计表的时候用户所有权限中有一项url权限。
    // 判断用户要请求的这个url是否在用户拥有的url权限里面
    console.log(config.url);

    // 1. 如果用户有权限 return config
    // 2. 如果用户没有权限 return Promise.reject({msg: '没有权限})
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export function userLogin(data) {
  return axios.post('/api/userlogin', data);
}

export function loadUserList(params) {
  params = { ...params, ...{ _sort: 'id', _order: 'desc' } };
  return axios.get('/per/user', { params: params });
}

export function addUser(data) {
  return axios.post('/per/user', data);
}

export function deleteUser(ids) {
  return Promise.all(
    ids.map((id) => {
      return axios.delete(`/per/user/${id}`);
    })
  );
}

export function updateUser(user) {
  return axios.put(`/per/user/${user.id}`, user);
}

export function loadRoleList(params) {
  return axios.get('/per/role', { params });
}

export function deleteRoles(ids) {
  return Promise.all(
    ids.map((id) => {
      return axios.delete(`/per/role/${id}`);
    })
  );
}

export function addRole(role) {
  return axios.post('/per/role', role);
}

export function saveRole(role) {
  return axios.put(`/per/role/${role.id}`, role);
}

// 权限相关方法
export function loadPerList(params) {
  return axios.get('/per/permission', { params });
}

// 添加权限的方法
export function addPer(per) {
  return axios.post('/per/permission', per);
}

export function editPer(per) {
  return axios.put(`/per/permission/${per.id}`, per);
}

// 删除权限
export function deletePer(ids) {
  return Promise.all(
    ids.map((id) => {
      return axios.delete(`/per/permission/${id}`);
    })
  );
}

// 加载所有的角色信息
export function loadAllRoles() {
  return axios.get('/per/role');
}

// 加载用户关联的角色信息
export function loadUserRoles(userId) {
  return axios.get('/per/user_role', { params: { userId } });
}

// 给用户设置关联的角色信息
export function addUserRole(userRole) {
  return axios.post('/per/user_role', userRole);
}

// 删除用户和角色的关联
export function deleteUserRole(id) {
  return axios.delete(`/per/user_role/${id}`);
}

// 加载所有的权限数据
export function loadAllPer() {
  return axios.get('/per/permission');
}

export function loadRolePer(roleId) {
  return axios.get('/per/role_permission', { params: { roleId } });
}

// 添加角色关联权限
export function addRolePer(rolePer) {
  return axios.post('/per/role_permission', rolePer);
}

// 去掉角色和权限的关联
export function deleteRolePer(rolePerId) {
  return axios.delete(`/per/role_permission/${rolePerId}`);
}

// 加载用户的所有关联的用户权限
export function loadUserPer(userId) {
  return axios.get('/per/user_permission', { params: { userId } });
}

// 添加用户关联的权限
export function addUserPer(userPer) {
  return axios.post('/per/user_permission', userPer);
}

// 删除用户关联权限
export function deleteUserPer(id) {
  return axios.delete(`/per/user_permission/${id}`);
}

// 加载用户的所有权限
export function loadUserAllPer(id) {
  return axios.get(`/per/getUserPer/${id}`);
}
